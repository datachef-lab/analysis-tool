import { OpenAI } from 'openai';
import dbMetadata from '../data/db_metadata.json';

// Interfaces
export interface QueryAnalysis {
    relevantTables: string[];
    relevantColumns: Record<string, string[]>;
    filters: {
        column: string;
        operator: string;
        value: string;
        table?: string;
    }[];
    relationships: {
        table1: string;
        column1: string;
        table2: string;
        column2: string;
    }[];
    aggregations?: {
        function: string;
        column: string;
        table?: string;
    }[];
    groupBy?: {
        column: string;
        table?: string;
    }[];
    orderBy?: {
        column: string;
        direction: 'ASC' | 'DESC';
        table?: string;
    }[];
    limit?: number;
    customSql?: string;
    displayRecommendation?: {
        displayType: string;
        title: string;
        description: string;
        [key: string]: unknown;
    };
}

export interface AnalysisResult {
    analysis: QueryAnalysis;
    sql: string;
}

// Check for API key
if (!process.env.XAI_API_KEY) {
    throw new Error('XAI_API_KEY environment variable is not set');
}

// Initialize the client
const client = new OpenAI({
    apiKey: process.env.XAI_API_KEY as string,
    baseURL: "https://api.x.ai/v1"
});

/**
 * Analyzes a user query to identify relevant database elements
 */
export async function analyzeQuery(question: string): Promise<QueryAnalysis> {
    try {
        const prompt = [
            {
                role: "system" as const,
                content: `You are a query analyzer for a PostgreSQL database. Given a user question, analyze it to identify the relevant database elements needed to answer it.

The database schema is defined as follows:
${JSON.stringify(dbMetadata, null, 2)}

Your task is to analyze the user's intent and identify:
1. Relevant tables needed to answer the question
2. Relevant columns from each table
3. Any filters that should be applied (column, operator, value)
4. Relationships between tables that should be used for joins
5. Any aggregations, groupings, or sorting needed

IMPORTANT PATTERNS TO RECOGNIZE:
- If the question asks about "passing" or "passed" records in the "marksheets" table, filter where remarks LIKE '%Semester Cleared%'
- If the question asks about "failed" records in the "marksheets" table, filter where remarks LIKE '%Semester not cleared%'
- Always include proper table joins when tables have relationships
- Always return user-friendly column names using aliases (e.g., "Student Name" instead of "name")
- Include appropriate year filters when years are mentioned (e.g., 2023)
- Limit large result sets to 100 records by default unless otherwise specified

Return your analysis as a JSON object with the following structure:
{
  "relevantTables": [array of table names],
  "relevantColumns": {table1: [columns], table2: [columns], ...},
  "filters": [{column, operator, value, table?}],
  "relationships": [{table1, column1, table2, column2}],
  "aggregations": [{function, column, table?}],
  "groupBy": [{column, table?}],
  "orderBy": [{column, direction, table?}],
  "limit": number,
  "displayRecommendation": {
    "displayType": "table" | "barChart" | "pieChart" | "lineChart" | "numberCard",
    "title": "Human readable title",
    "description": "Brief description of the visualization"
  }
}

For cases where you have high confidence, you may include a "customSql" property with the complete SQL query.`
            },
            {
                role: "user" as const,
                content: `Question: ${question}

Analyze this question to identify the relevant database elements needed to answer it.`
            }
        ];

        const response = await client.chat.completions.create({
            model: "grok-3-beta",
            messages: prompt,
            temperature: 0.1,
            response_format: { type: "json_object" },
        });

        if (!response.choices[0].message.content) {
            throw new Error('No analysis generated');
        }

        // Parse and validate the response
        const content = response.choices[0].message.content;
        const analysis = JSON.parse(content) as QueryAnalysis;

        // Ensure required properties exist
        analysis.relevantTables = analysis.relevantTables || [];
        analysis.relevantColumns = analysis.relevantColumns || {};
        analysis.filters = analysis.filters || [];
        analysis.relationships = analysis.relationships || [];

        // Set default limit if not specified
        if (!analysis.limit) {
            analysis.limit = 100;
        }

        // Add consistency check for marksheet passing/failing status
        if (analysis.relevantTables.includes('marksheets') &&
            question.toLowerCase().match(/pass(ed|ing)?|cleared|fail(ed|ing)?|not cleared/i)) {

            // Check if we already have a filter for remarks
            const hasRemarksFilter = analysis.filters.some(filter =>
                filter.column === 'remarks' && filter.table === 'marksheets');

            // If not, add the appropriate filter based on the question
            if (!hasRemarksFilter) {
                const isPassing = question.toLowerCase().match(/pass(ed|ing)?|cleared/i) !== null;
                analysis.filters.push({
                    column: 'remarks',
                    operator: 'LIKE',
                    value: isPassing ? '%Semester Cleared%' : '%Semester not cleared%',
                    table: 'marksheets'
                });
            }
        }

        // Ensure display recommendation exists
        if (!analysis.displayRecommendation) {
            analysis.displayRecommendation = {
                displayType: "table",
                title: "Query Results",
                description: "Results for: " + question
            };
        }

        return analysis;
    } catch (error) {
        console.error('Error analyzing query:', error);
        throw new Error('Failed to analyze query');
    }
}

/**
 * Analyzes a user query and validates the generated SQL
 */
export async function analyzeAndGenerateSQL(question: string): Promise<AnalysisResult> {
    // First, analyze the query
    const analysis = await analyzeQuery(question);

    // Import the generateSQL function here to avoid circular dependency
    const { generateSQL } = await import('./sqlGenerator');

    // Then generate SQL based on the analysis
    const sql = await generateSQL(question, analysis);

    // Return both analysis and SQL
    return {
        analysis,
        sql
    };
}