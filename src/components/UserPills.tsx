import { CHATTING_PAGE } from "@/constants/pageRoutes";
import { User } from "@/db/schema/user";
import { makeUrl } from "@/utils/utilityFunctions";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import UserAvatar from "./UserAvatar";

const UserPills = ({ user }: { user: User }) => {
    return (
        <Link
            href={makeUrl(CHATTING_PAGE, {
                friendId: user.name,
            })}
        >
            <div className="flex items-center border-2 p-2 rounded-md flex-wrap">
                <UserAvatar username={user.name} />
                {user.name}
                <ExternalLink className="ml-2 size-4" />
            </div>
        </Link>
    );
};

export default UserPills;
