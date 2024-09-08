// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  timestamp,
  varchar,
  text,
  uuid,
  jsonb,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `tabhoarder_${name}`);

export const sites = createTable(
  "site",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name"),
    url: varchar("url"),
    description: varchar("description"),

    userID: varchar("user_id").notNull(),

    imageURL: varchar("image_url"),
    importance: text("importance", { enum: ["low", "medium", "high"]}),
    visits: jsonb("visits").default([]),
    keywords: varchar("keywords").array().default([]), // the ones the scrapper and ai model add
    tags: varchar("tags").array().default([]), // the ones the user might add

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);
