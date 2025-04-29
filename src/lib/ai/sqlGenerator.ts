import { OpenAI } from 'openai';
import dbMetadata from '../data/db_metadata.json';

// Check for API key
if (!process.env.XAI_API_KEY) {
    throw new Error('XAI_API_KEY environment variable is not set');
}

// Initialize the client
const client = new OpenAI({
    apiKey: process.env.XAI_API_KEY as string,
    baseURL: "https://api.x.ai/v1"
});

import { QueryAnalysis } from './queryAnalyzer';

// Define sample data for query validation
const sampleData: Record<string, Array<Record<string, string | number | boolean>>> = {
    "students": [
        { id: 1, user_id_fk: 101, program_id_fk: 1, active: true },
        { id: 2, user_id_fk: 102, program_id_fk: 2, active: true },
        { id: 3, user_id_fk: 103, program_id_fk: 1, active: false }
    ],
    "users": [
        { id: 101, name: "John Doe", email: "john@example.com", role: "STUDENT" },
        { id: 102, name: "Jane Smith", email: "jane@example.com", role: "STUDENT" },
        { id: 103, name: "Alice Brown", email: "alice@example.com", role: "STUDENT" }
    ],
    "marksheets": [
        { id: 1, student_id_fk: 1, semester: 1, year: 2023, sgpa: 8.5, cgpa: 8.5, classification: "First Class", remarks: "Semester Cleared" },
        { id: 2, student_id_fk: 1, semester: 2, year: 2023, sgpa: 9.0, cgpa: 8.75, classification: "First Class", remarks: "Semester Cleared" },
        { id: 3, student_id_fk: 2, semester: 1, year: 2023, sgpa: 6.0, cgpa: 6.0, classification: "Second Class", remarks: "Semester Cleared" },
        { id: 4, student_id_fk: 3, semester: 1, year: 2023, sgpa: 3.5, cgpa: 3.5, classification: "Failed", remarks: "Semester not cleared" }
    ],
    "courses": [
        { id: 1, name: "Mathematics", program_id_fk: 1, code: "MATH101", credits: 4 },
        { id: 2, name: "Computer Science", program_id_fk: 1, code: "CS101", credits: 3 },
        { id: 3, name: "Physics", program_id_fk: 2, code: "PHY101", credits: 4 }
    ],
    "programs": [
        { id: 1, name: "B.Tech Computer Science", stream_id_fk: 1 },
        { id: 2, name: "B.Sc Physics", stream_id_fk: 2 }
    ]
};

/**
 * Validates if a SQL query is likely to work based on sample data and schema
 */
function validateQueryStructure(sql: string): { isValid: boolean; error?: string } {
    try {
        // Check for common SQL syntax issues
        if (!sql.trim()) {
            return { isValid: false, error: "Empty SQL query" };
        }

        // Basic validation of SELECT syntax
        if (!sql.toLowerCase().includes('select')) {
            return { isValid: false, error: "Missing SELECT statement" };
        }

        // Check for proper table references
        const tableNames = Object.keys(dbMetadata).filter(k => k.startsWith('public.'))
            .map(k => k.split('.')[1]);

        // Look for references to non-existent tables
        const sqlLower = sql.toLowerCase();
        const usesUnknownTable = tableNames.some(table =>
            sqlLower.includes(` ${table} `) && !Object.keys(dbMetadata).some(k => k.includes(table))
        );

        if (usesUnknownTable) {
            return { isValid: false, error: "Query references non-existent tables" };
        }

        return { isValid: true };
    } catch (error) {
        return {
            isValid: false,
            error: `Query validation error: ${error instanceof Error ? error.message : String(error)}`
        };
    }
}

/**
 * Generates SQL based on user question and analysis
 */
export async function generateSQL(question: string, analysis: QueryAnalysis): Promise<string> {
    // If analysis has a custom SQL query, validate and use it
    if (analysis.customSql) {
        const validation = validateQueryStructure(analysis.customSql);
        if (validation.isValid) {
            return analysis.customSql;
        }
        console.warn("Custom SQL validation failed:", validation.error);
        // We'll generate a new query instead
    }

    try {
        const prompt = [
            {
                role: "system" as const,
                content: `You are a SQL generator for a PostgreSQL database. Given a user question and its analysis, generate a valid SQL query to answer the question.

The database schema is defined as follows:
${JSON.stringify(dbMetadata, null, 2)}

Here's some sample data to help with query construction:
${JSON.stringify(sampleData, null, 2)}

IMPORTANT: Structure your SQL based on the display type recommended in the analysis:

1. For "table" display:
   - Multiple rows/columns of data are appropriate
   - Use descriptive column names with aliases
   - Example: SELECT u.name AS "Student Name", m.sgpa AS "SGPA", m.cgpa AS "CGPA" FROM ...

2. For "barChart" display:
   - First column should be category labels (x-axis)
   - Second column should be numeric values (y-axis)
   - Limit to 10-15 categories for readability
   - Example: SELECT d.name AS "Department", COUNT(s.id) AS "Student Count" FROM ...

3. For "pieChart" display:
   - First column should be category labels (segments)
   - Second column should be numeric values (size of segments)
   - Limit to 5-8 categories for readability
   - Consider using CASE statements to group small categories as "Other"
   - Example: SELECT 'Passed' AS "Status", COUNT(*) AS "Count" FROM ...

4. For "lineChart" display:
   - First column should be time/sequence points (x-axis)
   - Second column should be numeric values (y-axis)
   - Order by time/sequence column
   - Example: SELECT m.year AS "Year", AVG(m.cgpa) AS "Average CGPA" FROM ...

5. For "numberCard" display:
   - Return exactly one row with clear column names
   - First column should be the main label/description
   - Include supporting context columns as needed
   - Example: SELECT s.name AS "Subject Name", COUNT(*) AS "Total Students", ROUND((COUNT(CASE WHEN status = 'PASS' THEN 1 END)::FLOAT / COUNT(*)) * 100, 2) AS "Pass Rate" FROM ...

Guidelines for generating SQL:
- Generate valid PostgreSQL syntax only
- Include proper table joins based on the identified relationships
- Select only the necessary columns to answer the question
- Apply the appropriate filters based on the analysis
- Use appropriate aggregate functions when needed (COUNT, SUM, AVG, etc.)
- Format the SQL query for readability
- Use aliases for better column names (e.g., "Student Name" instead of "name")
- Always qualify column names with table aliases
- DO NOT include any explanations or comments in your response, ONLY the SQL query
`
            },
            {
                role: "user" as const,
                content: `Question: ${question}

Analysis:
${JSON.stringify(analysis, null, 2)}

Generate a SQL query to answer this question based on the provided analysis.`
            }
        ];

        const response = await client.chat.completions.create({
            model: "grok-3-beta",
            messages: prompt,
            temperature: 0.1,
        });

        if (!response.choices[0].message.content) {
            throw new Error('No SQL generated');
        }

        // Clean the response to ensure we just get the SQL
        let sql = response.choices[0].message.content.trim();

        // Remove markdown code blocks if present
        if (sql.startsWith('```sql')) {
            sql = sql.substring(6);
        }
        if (sql.startsWith('```')) {
            sql = sql.substring(3);
        }
        if (sql.endsWith('```')) {
            sql = sql.substring(0, sql.length - 3);
        }

        // Validate the generated SQL
        const validation = validateQueryStructure(sql.trim());
        if (!validation.isValid) {
            console.warn("Generated SQL validation warning:", validation.error);

            // Try to fix common issues
            if (validation.error?.includes("non-existent tables")) {
                // Try to fix table references
                const tableRefs = Object.keys(dbMetadata)
                    .filter(k => k.startsWith('public.'))
                    .map(k => k.split('.')[1]);

                // Log available tables for debugging
                console.log("Available tables:", tableRefs);
            }
        }

        return sql.trim();
    } catch (error) {
        console.error('Error generating SQL:', error);
        throw new Error('Failed to generate SQL query');
    }
} 