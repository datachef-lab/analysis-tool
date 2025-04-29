/**
 * Display Format Documentation
 * 
 * This file documents the display formats supported by the application and provides guidance
 * on how to structure SQL queries to match the expected data formats for each visualization type.
 */

/**
 * Available Display Types:
 * 
 * 1. table - Tabular data display
 * 2. barChart - Vertical bar chart
 * 3. pieChart - Circular chart showing proportions
 * 4. lineChart - Line graph for trends over time
 * 5. numberCard - Simple card highlighting a single important value
 */

export interface DisplayFormatInfo {
    displayType: string;
    description: string;
    dataRequirements: string[];
    bestUsedFor: string[];
    sqlExamples: string[];
    resultFormat: string;
}

/**
 * Collection of display format information to guide AI responses
 */
export const displayFormats: Record<string, DisplayFormatInfo> = {
    table: {
        displayType: "table",
        description: "Basic tabular data display showing multiple rows and columns",
        dataRequirements: [
            "Headers array (column names)",
            "Rows array (each row is an array of values)",
            "Any number of columns"
        ],
        bestUsedFor: [
            "Detailed data with multiple attributes",
            "Lists of items (students, courses, etc.)",
            "Comparisons across multiple metrics"
        ],
        sqlExamples: [
            `SELECT u.name AS "Student Name", p.name AS "Program", m.sgpa AS "SGPA", m.cgpa AS "CGPA" 
       FROM users u 
       JOIN students s ON u.id = s.user_id_fk 
       JOIN marksheets m ON s.id = m.student_id_fk 
       JOIN programs p ON s.program_id_fk = p.id
       WHERE m.year = 2023
       ORDER BY m.cgpa DESC`,
        ],
        resultFormat: `{
      "headers": ["Student Name", "Program", "SGPA", "CGPA"],
      "rows": [
        ["John Doe", "Computer Science", "9.0", "8.75"],
        ["Jane Smith", "Physics", "8.5", "8.2"]
      ]
    }`
    },

    barChart: {
        displayType: "barChart",
        description: "Vertical bar chart for comparing quantities across categories",
        dataRequirements: [
            "Category labels (names)",
            "Numeric values (must be numbers)",
            "Typically limited to 10-15 categories for readability"
        ],
        bestUsedFor: [
            "Comparing quantities across different categories",
            "Showing distributions by discrete groups",
            "Visualizing counts, totals, or averages by category"
        ],
        sqlExamples: [
            `SELECT p.name AS "Program", COUNT(s.id) AS "Student Count" 
       FROM programs p 
       JOIN students s ON p.id = s.program_id_fk 
       WHERE s.active = true 
       GROUP BY p.name 
       ORDER BY "Student Count" DESC`,

            `SELECT 
         CASE 
           WHEN m.sgpa >= 9.0 THEN 'A+' 
           WHEN m.sgpa >= 8.0 THEN 'A' 
           WHEN m.sgpa >= 7.0 THEN 'B+' 
           WHEN m.sgpa >= 6.0 THEN 'B' 
           ELSE 'C or below' 
         END AS "Grade", 
         COUNT(*) AS "Student Count" 
       FROM marksheets m 
       WHERE m.year = 2023 
       GROUP BY "Grade" 
       ORDER BY "Grade" ASC`
        ],
        resultFormat: `{
      "data": [
        { "name": "Computer Science", "value": 120 },
        { "name": "Physics", "value": 85 },
        { "name": "Mathematics", "value": 65 }
      ]
    }`
    },

    pieChart: {
        displayType: "pieChart",
        description: "Circular chart showing proportions of a whole",
        dataRequirements: [
            "Category labels (slices)",
            "Numeric values (must be numbers)",
            "Limit to 5-8 categories for readability",
            "Consider grouping small slices as 'Other'"
        ],
        bestUsedFor: [
            "Showing distribution percentages",
            "Displaying proportions of a whole",
            "Pass/fail ratios, classification breakdowns"
        ],
        sqlExamples: [
            `SELECT 
         CASE WHEN m.remarks LIKE '%Semester Cleared%' THEN 'Pass' ELSE 'Fail' END AS "Status", 
         COUNT(*) AS "Count" 
       FROM marksheets m 
       WHERE m.year = 2023 
       GROUP BY "Status"`,

            `SELECT 
         CASE 
           WHEN classification = 'First Class' THEN 'First Class' 
           WHEN classification = 'Second Class' THEN 'Second Class' 
           ELSE 'Other' 
         END AS "Classification", 
         COUNT(*) AS "Student Count" 
       FROM marksheets 
       WHERE year = 2023 
       GROUP BY "Classification"`
        ],
        resultFormat: `{
      "data": [
        { "name": "Pass", "value": 80 },
        { "name": "Fail", "value": 20 }
      ]
    }`
    },

    lineChart: {
        displayType: "lineChart",
        description: "Line graph for displaying trends over time or sequences",
        dataRequirements: [
            "Time or sequence points (x-axis)",
            "Numeric values (y-axis)",
            "Data must be ordered by time/sequence"
        ],
        bestUsedFor: [
            "Showing trends over time",
            "Displaying progressive changes",
            "Comparing metrics across sequential periods"
        ],
        sqlExamples: [
            `SELECT m.year AS "Year", AVG(m.cgpa) AS "Average CGPA" 
       FROM marksheets m 
       GROUP BY m.year 
       ORDER BY m.year ASC`,

            `SELECT m.semester AS "Semester", AVG(m.sgpa) AS "Average SGPA" 
       FROM marksheets m 
       WHERE m.year = 2023 
       GROUP BY m.semester 
       ORDER BY m.semester ASC`
        ],
        resultFormat: `{
      "data": [
        { "name": "2020", "value": 7.8 },
        { "name": "2021", "value": 8.1 },
        { "name": "2022", "value": 8.3 },
        { "name": "2023", "value": 8.5 }
      ]
    }`
    },

    numberCard: {
        displayType: "numberCard",
        description: "Simple card highlighting a single important metric or finding",
        dataRequirements: [
            "One row with multiple columns",
            "First column typically serves as the main label",
            "Should include supporting context columns"
        ],
        bestUsedFor: [
            "Highlighting key metrics (max, min, average)",
            "Showing important summary statistics",
            "Presenting answers to specific questions"
        ],
        sqlExamples: [
            `SELECT sm.name AS "Subject Name", 
         COUNT(s.status) AS "Total Students", 
         COUNT(CASE WHEN s.status = 'PASS' THEN 1 END) AS "Passed Students", 
         (COUNT(CASE WHEN s.status = 'PASS' THEN 1 END)::FLOAT / COUNT(s.status)) * 100 AS "Pass Rate" 
       FROM subjects s 
       JOIN subject_metadatas sm ON s.subject_metadata_id_fk = sm.id 
       GROUP BY sm.id, sm.name 
       ORDER BY "Pass Rate" ASC 
       LIMIT 1`,

            `SELECT 'Overall Average' AS "Metric", 
         AVG(m.sgpa) AS "Average SGPA", 
         AVG(m.cgpa) AS "Average CGPA" 
       FROM marksheets m 
       WHERE m.year = 2023`
        ],
        resultFormat: `{
      "Subject Name": "Mathematics",
      "Total Students": 85,
      "Passed Students": 65,
      "Pass Rate": 76.47
    }`
    }
};

/**
 * Function to suggest the best display type based on query characteristics
 */
export function suggestDisplayType(
    hasMultipleRows: boolean,
    columnCount: number,
    hasTimeColumn: boolean,
    hasCategories: boolean,
    isAggregation: boolean
): string {
    if (!hasMultipleRows && columnCount >= 3) {
        return "numberCard"; // Single row with multiple columns = key metric
    }

    if (hasTimeColumn) {
        return "lineChart"; // Time series data
    }

    if (hasCategories && columnCount <= 2 && isAggregation) {
        return columnCount > 7 ? "barChart" : "pieChart"; // Category comparison
    }

    if (hasMultipleRows && columnCount > 2) {
        return "table"; // Detailed data with multiple columns
    }

    if (hasCategories && isAggregation) {
        return "barChart"; // Default for category comparisons
    }

    return "table"; // Default fallback
} 