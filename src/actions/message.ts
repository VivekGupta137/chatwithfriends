"use server";

import { MAX_MESSAGE_LIMIT } from "@/constants/common";
import { CHATTING_PAGE } from "@/constants/pageRoutes";
import { db } from "@/db";
import { messageSchema } from "@/db/schema/message";
import { makeUrl } from "@/utils/utilityFunctions";
import { and, desc, eq, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addMessage = async (
    message: string,
    fromId: string,
    toId: string
) => {
    // message from fromId to toId
    // check if fromId and toId are valid
    if (!fromId || !toId) {
        throw new Error("Invalid fromId or toId");
    }

    // check if message is valid
    if (!message || message.length === 0) {
        throw new Error("Invalid message");
    }

    // add message to db
    const newMessage = await db
        .insert(messageSchema)
        .values({
            senderId: fromId,
            receiverId: toId,
            message,
        })
        .returning()
        .then((data) => data[0]);
    revalidatePath(makeUrl(CHATTING_PAGE, { friendId: toId }));
    return newMessage;
};

export const getMessages = async (
    fromId: string,
    toId: string,
    limit: number = MAX_MESSAGE_LIMIT,
    offset: number = 0
) => {
    // check if fromId and toId are valid
    if (!fromId || !toId) {
        throw new Error("Invalid fromId or toId");
    }

    // get messages from db
    const messages = await db.query.messageSchema.findMany({
        where: or(
            and(
                eq(messageSchema.senderId, fromId),
                eq(messageSchema.receiverId, toId)
            ),
            and(
                eq(messageSchema.senderId, toId),
                eq(messageSchema.receiverId, fromId)
            )
        ),
        orderBy: desc(messageSchema.createdAt),
        limit,
        offset,
    });
    return messages;
};
