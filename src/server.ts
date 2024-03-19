import fastify from "fastify";
import { z } from "zod";
import { sql } from "./lib/postgres";
import postgres from "postgres";
import { redis } from "./lib/redis";

const app = fastify();

app.get("/:code", async (request, reply) => {
  const { code } = z
    .object({
      code: z.string().min(3),
    })
    .parse(request.params);

  const result = await sql`
    SELECT id, original_url
    FROM shortUrls
    WHERE code = ${code}
  `;

  if (result.length === 0) {
    return { redirect: "/" };
  }
  console.log(result[0].id);
  await redis.zincrby("metrics", 1, String(result[0].id));

  return reply.redirect(301, result[0].original_url);
});

app.get("/api/links", async () => {
  const result = await sql`
    SELECT * FROM shortUrls
`;

  return result;
});

app.post("/api/links", async (request, reply) => {
  const { code, url } = z
    .object({
      code: z.string().min(3),
      url: z.string().url(),
    })
    .parse(request.body);

  try {
    const result = await sql`
      INSERT INTO shortUrls (code, original_url)
      VALUES (${code}, ${url})
      RETURNING id
    `;

    const link = result[0];

    return reply.code(201).send({ shortLinkId: link.id });
  } catch (err) {
    if (err instanceof postgres.PostgresError && err.code === "23505") {
      return reply.code(400).send({ message: "Code in use" });
    }
    return reply.code(500).send({ message: "Internal server error" });
  }
});

app.listen({ port: 3333 }).then(() => {
  console.log(`Server is running on port ${3333}`);
});
