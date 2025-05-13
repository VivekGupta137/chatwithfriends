import { createId } from "@/utils/utilityFunctions";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const messageSchema = pgTable("message", {
    id: varchar("id")
        .primaryKey()
        .$defaultFn(() => {
            return createId("xm");
        }),
    senderId: varchar("sender_id").notNull(),
    receiverId: varchar("receiver_id").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date",
    })
        .notNull()
        .defaultNow(),
});

export type Message = InferSelectModel<typeof messageSchema>;
export type NewMessage = InferInsertModel<typeof messageSchema>;
