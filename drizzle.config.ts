import { config } from "dotenv";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

config({
    path: ".env",
});

export default defineConfig({
    out: "./drizzle",
    schema: "./src/db/schema",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    migrations: {
        table: "drizzle_migrations",
        schema: "public",
    },
    verbose: true,
});
