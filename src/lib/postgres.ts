import postgress from "postgres";

require("dotenv").config();

const DB_URI = process.env.URI_POSTGRES!;

export const sql = postgress(DB_URI);
