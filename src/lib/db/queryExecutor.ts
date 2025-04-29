import { db } from './index';
import { sql } from 'drizzle-orm';

export async function executeQuery(query: string) {
    try {
        // Execute the raw SQL query
        return await executeQueryWithFixes(query);
    } catch (error) {
        console.error('Error executing query:', error);
        throw new Error(`Failed to execute query: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

// Helper function to execute query with automatic error correction
async function executeQueryWithFixes(query: string) {
    try {
        // Try executing the original query
        const result = await db.execute(sql.raw(query));
        return result;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);

        // Handle GROUP BY errors
        if (errorMessage.includes('must appear in the GROUP BY clause')) {
            console.warn('Attempting to fix GROUP BY error in query');

            // Extract column that needs to be grouped
            const match = errorMessage.match(/column "([^"]+)" must appear/);
            if (match && match[1]) {
                const columnToAdd = match[1];

                // Find the GROUP BY clause - using case insensitive flag but not 's' flag
                const groupByRegex = /GROUP BY\s+(.*?)(?:ORDER BY|LIMIT|HAVING|$)/i;
                const groupByMatch = query.match(groupByRegex);

                if (groupByMatch) {
                    // Extract existing GROUP BY content
                    const existingGroupBy = groupByMatch[1].trim();

                    // Create the fixed query by adding the missing column
                    const fixedQuery = query.replace(
                        new RegExp(`GROUP BY\\s+${existingGroupBy.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i'),
                        `GROUP BY ${existingGroupBy}, ${columnToAdd}`
                    );

                    console.log('Attempting fixed query:', fixedQuery);

                    // Try the fixed query
                    return await db.execute(sql.raw(fixedQuery));
                }
            }
        }

        // If we couldn't fix it or it's another error, rethrow
        throw error;
    }
} 