import { createId } from "@/utils/utilityFunctions";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { userSchema } from "./user";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const friendSchema = pgTable("friend", {
    id: varchar("id")
        .primaryKey()
        .$defaultFn(() => {
            return createId("xf");
        }),
    user1Id: varchar("user1_id")
        .references(() => userSchema.id, {
            onDelete: "cascade",
        })
        .notNull(),
    user2Id: varchar("user2_id")
        .references(() => userSchema.id, {
            onDelete: "cascade",
        })
        .notNull(),
    status: varchar("status").notNull(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date",
    })
        .notNull()
        .defaultNow(),
});

export type Friend = InferSelectModel<typeof friendSchema>;
export type NewFriend = InferInsertModel<typeof friendSchema>;
