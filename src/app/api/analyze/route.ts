import { NextResponse } from 'next/server';
import { analyzeAndGenerateSQL, QueryAnalysis } from '@/lib/ai/queryAnalyzer';
import { executeQuery } from '@/lib/db/queryExecutor';

// Define response type
interface QueryResponse {
    question: string;
    analysis: QueryAnalysis;
    sqlQuery: string;
    results: unknown[];
    display: {
        displayType: string;
        title: string;
        description: string;
        [key: string]: unknown;
    };
}

// Simple in-memory cache for query results
const queryCache: {
    [key: string]: {
        timestamp: number;
        result: QueryResponse;
    }
} = {};

// Cache expiration time (5 minutes)
const CACHE_TTL = 5 * 60 * 1000;

export async function POST(request: Request) {
    try {
        const { question } = await request.json();

        if (!question) {
            return NextResponse.json(
                { error: 'Question is required' },
                { status: 400 }
            );
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

            // Use the display recommendation from the analysis if available
            const displayRecommendation = analysis.displayRecommendation || {
                displayType: "table",
                title: "Query Results",
                description: "Displaying results in tabular format",
            };

            const response: QueryResponse = {
                question,
                analysis,
                sqlQuery: sql,
                results: Array.isArray(queryResults) ? queryResults : [],
                display: displayRecommendation
            };

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