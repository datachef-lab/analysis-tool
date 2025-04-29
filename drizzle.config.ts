import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    dbCredentials: {
        wranglerConfigPath: './wrangler.toml',
        dbName: 'academic360',
    },
});
