"use client";

import { getMessages } from "@/actions/message";
import { POLLING_INTERVAL } from "@/constants/common";
import { Message } from "@/db/schema/message";
import { User } from "@/db/schema/user";
import { useEffect, useState } from "react";

const ChatMessages = ({
    user,
    friend,
    initialMessages,
}: {
    user: User;
    friend: User;
    initialMessages: Message[];
}) => {
    const [messages, setMessages] = useState(initialMessages);
    useEffect(() => {
        // keep polling the server for new messages
        const interval = setInterval(async () => {
            const newMessages = await getMessages(user.id, friend.id);
            setMessages(newMessages);
        }, POLLING_INTERVAL);

        return () => {
            clearInterval(interval);
        };
    }, [user.id, friend.id]);

    return (
        <div className="min-h-[400px] max-h-[400px] overflow-y-auto flex flex-col-reverse">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex ${
                        message.senderId === user.id
                            ? "justify-end"
                            : "justify-start"
                    } p-2`}
                >
                    <div
                        className={`${
                            message.senderId === user.id
                                ? "bg-blue-500"
                                : "bg-green-500"
                        } text-white p-2 rounded-lg`}
                    >
                        <p>{message.message}</p>
                        <span className="text-xs text-gray-300">
                            {new Date(message.createdAt).toLocaleTimeString()}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatMessages;
