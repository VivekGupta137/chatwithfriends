import "server-only";

import { getSession } from "@/utils/authUtils";
import ChatContainer from "@/components/ChatContainer";
import { addUser } from "@/actions/user";
import { Info } from "lucide-react";
const page = async ({
    params,
}: {
    params: Promise<{
        to_username: string;
    }>;
}) => {
    const { user } = await getSession();
    const { to_username } = await params;
    if (!user) {
        return (
            <div>
                <h1>please login</h1>
            </div>
        );
    }
    const friend = await addUser(to_username);
    if (!friend) {
        return (
            <div>
                <h1>friend not found</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-10">
            <h1 className="text-3xl font-bold">Hello {user?.name} 👋</h1>
            <p className="text-lg flex gap-1 items-center">
                <Info className="size-4 stroke-blue-700" />
                You&apos;re messaging {friend?.name}
            </p>
            <div>
                <ChatContainer friend={friend} />
            </div>
        </div>
    );
};

export default page;
