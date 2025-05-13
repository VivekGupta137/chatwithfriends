"use client";

import { addMessage } from "@/actions/message";
import { User } from "@/db/schema/user";

const ChatForm = ({ user, friend }: { user: User; friend: User }) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent the default form submission behavior
        // and handle the form submission with JavaScript
        event.preventDefault();
        console.log({ user, friend });
        const target = event.currentTarget as HTMLFormElement;

        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const message = formData.get("message") as string;
        if (!message) {
            return;
        }

        // Handle form submission logic here
        await addMessage(message, user.id, friend.id);
        // console.log({ sentMessage });

        // Reset the form
        target.reset();
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex items-center justify-between border-t border-black p-2"
            >
                <input
                    name="message"
                    type="text"
                    placeholder="Type your message here..."
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatForm;
