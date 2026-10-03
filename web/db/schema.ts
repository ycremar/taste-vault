import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
export const events = sqliteTable("vault_events", {
 id: text("id").notNull(), revision: integer("revision").notNull(),
 payload: text("payload").notNull(), savedAt: text("saved_at").notNull(),
}, table => [primaryKey({ columns: [table.id, table.revision] })]);
