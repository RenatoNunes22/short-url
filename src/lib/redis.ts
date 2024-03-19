import { Redis } from "@upstash/redis";

require("dotenv").config();

const URI_REDIS = process.env.URI_REDIS!;
const TOKEN_REDIS = process.env.TOKEN_REDIS!;

export const redis = new Redis({
  url: URI_REDIS,
  token: TOKEN_REDIS,
});
