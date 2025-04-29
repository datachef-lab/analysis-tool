import { NextResponse } from 'next/server';
import { analyzeAndGenerateSQL, QueryAnalysis } from '@/lib/ai/queryAnalyzer';
import { executeQuery } from '@/lib/db/queryExecutor';
// Import display format types for reference and documentation

// Define response type
interface QueryResponse {
    question: string;
    analysis: QueryAnalysis;
    sqlQuery: string;
    results: unknown[];
    displayData?: {
        type: string;  // Directly compatible with frontend component types: text, table, barChart, pieChart, etc.
        data: unknown;
    };
    display: {
        displayType: string;  // One of: table, barChart, pieChart, lineChart, numberCard
        title: string;
        description: string;
        [key: string]: unknown;
    };
}

// Extended QueryAnalysis with optional title and description
interface ExtendedQueryAnalysis extends QueryAnalysis {
    title?: string;
    description?: string;
}

// Define the DisplayData type
interface DisplayData {
    type: string;
    data: unknown;
}

/**
 * Examples of display format recommendations:
 * 
 * 1. Table format: Basic tabular data
 *    {
 *      "displayType": "table",
 *      "title": "Student Performance Data",
 *      "description": "Detailed student performance across different metrics"
 *    }
 * 
 * 2. Number Card: For single important metrics
 *    {
 *      "displayType": "numberCard",
 *      "title": "Subject with Lowest Pass Rate",
 *      "description": "Displays the subject with the lowest percentage of students passing"
 *    }
 * 
 * 3. Bar Chart: For category comparisons
 *    {
 *      "displayType": "barChart",
 *      "title": "Students per Department",
 *      "description": "Number of students enrolled in each department"
 *    }
 * 
 * 4. Pie Chart: For proportional data
 *    {
 *      "displayType": "pieChart",
 *      "title": "Pass/Fail Distribution",
 *      "description": "Distribution of passing vs failing students"
 *    }
 * 
 * 5. Line Chart: For time series data
 *    {
 *      "displayType": "lineChart",
 *      "title": "GPA Trends by Semester",
 *      "description": "Average GPA trend over consecutive semesters"
 *    }
 */

// Simple in-memory cache for query results
const queryCache: {
    [key: string]: {
        timestamp: number;
        result: QueryResponse;
    }
} = {};

// Cache expiration time (5 minutes)
const CACHE_TTL = 5 * 60 * 1000;

// Type for query results
interface QueryResult {
    [key: string]: string | number | boolean | null;
}

/**
 * Helper function to determine if a result should be displayed as simple text
 * @param results Query results
 * @returns {boolean} Whether the results should be displayed as text
 */
function shouldDisplayAsText(question: string, results: QueryResult[]): boolean {
    // Case 1: Check if the question is a simple greeting or not data-related
    const simpleQuestionPatterns = [
        /^hi$/i, /^hello$/i, /^hey$/i, /^greetings$/i,
        /^how are you/i, /^what can you do/i, /^help/i,
        /^who are you/i, /^what is this/i, /^tell me about/i
    ];

    if (simpleQuestionPatterns.some(pattern => pattern.test(question.trim()))) {
        return true;
    }

    // Case 2: Single row, single column results are often text messages
    if (results.length === 1 && Object.keys(results[0]).length === 1) {
        const columnName = Object.keys(results[0])[0];
        if (['Message', 'Result', 'Response', 'Text', 'Content'].includes(columnName)) {
            return true;
        }

        // If it's a short answer with few words, it's likely a text response
        const value = String(results[0][columnName]);
        const wordCount = value.split(/\s+/).length;
        if (wordCount < 10 && !value.includes('\n') && value.includes('.')) {
            return true;
        }
    }

    return false;
}

/**
 * Function to determine the best display type for a result set
 */
function determineDisplayType(question: string, results: QueryResult[]): { displayType: string, displayData?: DisplayData } {
    // Check if this should be a text display
    if (shouldDisplayAsText(question, results)) {
        // Extract the text content from results
        let textContent = "";
        if (results.length === 1) {
            textContent = String(Object.values(results[0])[0]);
        }

        return {
            displayType: "text",
            displayData: {
                type: "text",
                data: { text: textContent }
            }
        };
    }

    // If we only have 1-3 rows with 2 columns, it might be good for a pie chart
    if (results.length >= 1 && results.length <= 6 && Object.keys(results[0]).length === 2) {
        const isCategoricalData = results.every(row =>
            typeof Object.values(row)[1] === 'number' ||
            !isNaN(Number(Object.values(row)[1]))
        );

        // Check if question hints at distribution or proportion
        const distributionKeywords = ['distribution', 'breakdown', 'proportion', 'percentage', 'ratio', 'share'];
        const isPieChartQuery = distributionKeywords.some(keyword =>
            question.toLowerCase().includes(keyword)
        );

        if (isCategoricalData && (isPieChartQuery || results.length <= 6)) {
            const headers = Object.keys(results[0]);
            const chartData = results.map(item => ({
                name: String(item[headers[0]]),
                value: parseFloat(String(item[headers[1]]))
            }));

            return {
                displayType: "pieChart",
                displayData: {
                    type: "pieChart",
                    data: {
                        title: "Distribution",
                        data: chartData
                    }
                }
            };
        }
    }

    // For comparing values across categories, use bar chart
    if (results.length >= 2 && results.length <= 15 && Object.keys(results[0]).length === 2) {
        const isComparison = results.every(row =>
            typeof Object.values(row)[1] === 'number' ||
            !isNaN(Number(Object.values(row)[1]))
        );

        // Keywords that suggest comparison
        const comparisonKeywords = ['compare', 'top', 'highest', 'lowest', 'most', 'least', 'ranking'];
        const isComparisonQuery = comparisonKeywords.some(keyword =>
            question.toLowerCase().includes(keyword)
        );

        if (isComparison && (isComparisonQuery || results.length > 6)) {
            const headers = Object.keys(results[0]);
            const chartData = results.map(item => ({
                name: String(item[headers[0]]),
                value: parseFloat(String(item[headers[1]]))
            }));

            return {
                displayType: "barChart",
                displayData: {
                    type: "barChart",
                    data: {
                        title: "Comparison",
                        data: chartData,
                        xAxisLabel: headers[0],
                        yAxisLabel: headers[1]
                    }
                }
            };
        }
    }

    // Default to table display
    return { displayType: "table" };
}

export async function POST(request: Request) {
    try {
        const { question, requestDisplayType = false } = await request.json();

        if (!question) {
            return NextResponse.json(
                { error: 'Question is required' },
                { status: 400 }
            );
        }

        // Handle simple greeting without running a query
        const greetingPatterns = [
            /^hi$/i, /^hello$/i, /^hey$/i, /^greetings$/i,
            /^how are you/i, /^what can you do/i,
            /^who are you/i
        ];

        if (greetingPatterns.some(pattern => pattern.test(question.trim()))) {
            // Create a simple greeting response without complex analysis
            const greetingText = "Hello! I'm your College Data Analysis Assistant. I can help you analyze student data, enrollment trends, course performance, and more. Just ask me a question about the college data.";

            const greetingResponse = {
                question,
                analysis: { intent: "greeting" } as unknown as QueryAnalysis,
                sqlQuery: "SELECT 'Hello! How can I help you with the database today?' AS \"Message\";",
                results: [{ "Message": greetingText }],
                display: {
                    displayType: "text",
                    title: "Greeting",
                    description: "Assistant greeting response"
                },
                displayData: {
                    type: "text",
                    data: {
                        text: greetingText
                    }
                }
            };

            return NextResponse.json(greetingResponse);
        }

        // Check if we have a cached result for this question
        const cacheKey = question.trim().toLowerCase();
        if (queryCache[cacheKey] && (Date.now() - queryCache[cacheKey].timestamp) < CACHE_TTL) {
            // Return cached result
            console.log('Returning cached response for:', cacheKey);
            return NextResponse.json(queryCache[cacheKey].result);
        }

        try {
            // Use combined function for analysis and SQL generation in a single API call
            const result = await analyzeAndGenerateSQL(question);
            const { analysis, sql } = result;

            // Execute the SQL query
            console.log('Executing SQL query:', sql);
            const queryResults = await executeQuery(sql);

            // Process results for display
            const results = Array.isArray(queryResults) ? queryResults as QueryResult[] : [];

            // Determine the best display format
            const { displayType, displayData } = determineDisplayType(question, results);

            // Use the display recommendation from the analysis or our smart detection
            const extendedAnalysis = analysis as ExtendedQueryAnalysis;
            const displayRecommendation = analysis.displayRecommendation || {
                displayType: displayType,
                title: (extendedAnalysis.title) || "Query Results",
                description: (extendedAnalysis.description) || "Displaying query results",
            };

            const response: QueryResponse = {
                question,
                analysis,
                sqlQuery: sql,
                results,
                display: displayRecommendation
            };

            // Add the displayData if available and requested
            if (requestDisplayType && displayData) {
                response.displayData = displayData;
            }

            // Cache the result
            queryCache[cacheKey] = {
                timestamp: Date.now(),
                result: response
            };

            // Clean up old cache entries in the background
            setTimeout(cleanCache, 0);

            return NextResponse.json(response);
        } catch (error) {
            console.error('Error with SQL query:', error);

            // More detailed error information
            let errorMessage = 'Unknown error occurred';
            let errorDetails = '';

            if (error instanceof Error) {
                errorMessage = error.message;
                errorDetails = error.stack || '';
            } else if (typeof error === 'string') {
                errorMessage = error;
            } else if (error && typeof error === 'object') {
                errorMessage = JSON.stringify(error);
            }

            return NextResponse.json(
                {
                    error: `Query processing error: ${errorMessage}`,
                    details: errorDetails
                },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Error processing analysis request:', error);

        let errorMessage = 'Internal server error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json(
            { error: errorMessage, details: String(error) },
            { status: 500 }
        );
    }
}

// Function to clean up old cache entries
function cleanCache() {
    const now = Date.now();
    Object.keys(queryCache).forEach(key => {
        if ((now - queryCache[key].timestamp) > CACHE_TTL) {
            delete queryCache[key];
        }
    });
} 