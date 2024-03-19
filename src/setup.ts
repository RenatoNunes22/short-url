import { sql } from "./lib/postgres";

async function setup() {
  await sql`
    CREATE TABLE IF NOT EXISTS shortUrls (
      id SERIAL PRIMARY KEY,
      code TEXT UNIQUE,
      original_url TEXT,
    )
  `;
  await sql.end();
}

setup();
