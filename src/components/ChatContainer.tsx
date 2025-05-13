import "server-only";
import { getSession } from "@/utils/authUtils";
import ChatForm from "./ChatForm";
import ChatHeader from "./ChatHeader";
import { User } from "@/db/schema/user";
import { getMessages } from "@/actions/message";

const ChatContainer = async ({ friend }: { friend: User }) => {
    const { user } = await getSession();
    if (!user) {
        return <div>please login</div>;
    }
    const messages = await getMessages(user.id, friend.id);

    return (
        <div className="border-2 m-2 rounded-md basis-full">
            <ChatHeader friend={friend} />
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
                                {new Date(
                                    message.createdAt
                                ).toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <ChatForm user={user} friend={friend} />
        </div>
    );
};

export default ChatContainer;
