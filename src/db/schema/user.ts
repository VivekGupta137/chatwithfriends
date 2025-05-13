import { createId } from "@/utils/utilityFunctions";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const userSchema = pgTable("user", {
    id: varchar("id")
        .primaryKey()
        .$defaultFn(() => {
            return createId("xu");
        }),
    name: varchar("name").notNull().unique(),
});

export type User = InferSelectModel<typeof userSchema>;
export type NewUser = InferInsertModel<typeof userSchema>;
