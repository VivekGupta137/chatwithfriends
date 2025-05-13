"use server";

import { db } from "@/db";
import { userSchema } from "@/db/schema/user";
import { eq } from "drizzle-orm";

export const addUser = async (username: string) => {
    // add user if not exists in db
    let user = await db.query.userSchema.findFirst({
        where: eq(userSchema.name, username),
    });
    if (!user) {
        user = await db
            .insert(userSchema)
            .values({
                name: username,
            })
            .returning()
            .then((data) => data[0]);
    }
    return user;
};

export const getUser = async (userId: string) => {
    // get user from db
    const user = await db.query.userSchema.findFirst({
        where: eq(userSchema.id, userId),
    });
    return user;
};
