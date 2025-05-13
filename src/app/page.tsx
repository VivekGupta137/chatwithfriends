import UserPills from "@/components/UserPills";
import { IMPERSONATE_PAGE } from "@/constants/pageRoutes";
import { db } from "@/db";
import { getSession } from "@/utils/authUtils";
import { makeUrl } from "@/utils/utilityFunctions";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function Home() {
    const { user } = await getSession();
    const allUsers = await db.query.userSchema.findMany();
    return (
        <>
            {user && (
                <div className="h-screen">
                    you are logged in as {user?.name}
                    <div className="flex flex-col items-center justify-center h-screen">
                        <div> You may now chat with following users</div>
                        <div className="flex gap-2 flex-wrap">
                            {allUsers
                                .filter((u) => u.id !== user?.id)
                                .map((user) => (
                                    <div key={user.id} className="flex gap-2">
                                        <UserPills user={user} />
                                    </div>
                                ))}
                        </div>
                        <p className="text-lg ">
                            Please head over to{" "}
                            <Link
                                href={makeUrl(IMPERSONATE_PAGE)}
                                className="underline inline hover:bg-blue-100 p-0.5 rounded-md transition-all duration-200"
                            >
                                <span>
                                    impersonate{" "}
                                    <ExternalLink className="ml-2 size-4 inline-block" />
                                </span>
                            </Link>{" "}
                            page to add or impersonate a user
                        </p>
                    </div>
                </div>
            )}
            {!user && (
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-2xl font-bold">Welcome to Chat App</h1>
                    <p className="text-lg flex gap-1">
                        Please head over to{" "}
                        <Link
                            href={makeUrl(IMPERSONATE_PAGE)}
                            className="underline flex items-center hover:bg-blue-100 p-0.5 rounded-md transition-all duration-200"
                        >
                            impersonate
                            <ExternalLink className="ml-2 size-4" />
                        </Link>{" "}
                        page to add or impersonate a user
                    </p>
                </div>
            )}
        </>
    );
}
