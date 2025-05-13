import { User } from "@/db/schema/user";
import "server-only";
import UserPills from "./UserPills";
const ChatHeader = async ({ friend }: { friend: User }) => {
    return (
        <div className="flex items-center border-b border-black p-2">
            <UserPills user={friend} />
        </div>
    );
};

export default ChatHeader;
