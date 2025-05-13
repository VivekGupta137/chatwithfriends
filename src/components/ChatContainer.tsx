import "server-only";
import { getSession } from "@/utils/authUtils";
import ChatForm from "./ChatForm";
import ChatHeader from "./ChatHeader";
import { User } from "@/db/schema/user";
import { getMessages } from "@/actions/message";
import ChatMessages from "./ChatMessages";

const ChatContainer = async ({ friend }: { friend: User }) => {
    const { user } = await getSession();
    if (!user) {
        return <div>please login</div>;
    }
    const messages = await getMessages(user.id, friend.id);

    return (
        <div className="border-2 m-2 rounded-md basis-full">
            <ChatHeader friend={friend} />
            <ChatMessages
                user={user}
                friend={friend}
                initialMessages={messages}
            />
            <ChatForm user={user} friend={friend} />
        </div>
    );
};

export default ChatContainer;
