import "server-only";

import { db } from "@/db";
import { impersonateUser } from "@/utils/authUtils";
import { HOME_PAGE, IMPERSONATE_PAGE } from "@/constants/pageRoutes";
import { redirect } from "next/navigation";
import { addUser } from "@/actions/user";
import { makeUrl } from "@/utils/utilityFunctions";
import { AlertCircle } from "lucide-react";

const Page = async ({
    searchParams,
}: {
    searchParams?: Promise<{
        error?: string;
    }>;
}) => {
    const params = await searchParams;

    const allUsers = await db.query.userSchema.findMany();
    return (
        <div className="flex flex-col items-center justify-center h-screen px-2">
            <form
                action={async (formData: FormData) => {
                    "use server";

                    try {
                        const rawFormData = {
                            username: (formData.get("usernameInput") ||
                                formData.get("usernameSelect")) as string,
                        };

                        if (!rawFormData.username) {
                            throw new Error("Username is required");
                        }

                        // mutate data
                        // check if user exists
                        const user = await addUser(rawFormData.username);
                        // if user exists, then impersonate
                        if (user) {
                            // impersonate user & create the session
                            await impersonateUser(user);
                        }
                    } catch (error: unknown) {
                        const message =
                            error instanceof Error
                                ? error.message
                                : "Unknown error";
                        redirect(
                            `${makeUrl(IMPERSONATE_PAGE)}?error=${message}`
                        );
                    }
                    // redirect to home page
                    // after impersonating the user
                    redirect(HOME_PAGE);
                }}
            >
                {params?.error && (
                    <div className="w-full rounded-md bg-red-50 border-red-300 border-2 p-4 mb-2">
                        <div className="flex gap-2 items-center">
                            <AlertCircle className="size-5 shrink-0 text-red-500" />
                            <p className="text-sm font-medium text-red-600">
                                An error occurred - {params.error}.
                            </p>
                        </div>
                    </div>
                )}
                <p className="max-w-md mb-4">
                    Create a nonexisting user or impersonate an existing user by
                    entering their username
                </p>
                <div className="flex flex-col gap-2 mb-4">
                    <input
                        name="usernameInput"
                        type="text"
                        placeholder="enter username"
                        className="w-full p-2 border rounded"
                    />
                    <p className="text-sm text-gray-500">
                        OR quickly select from the list of users
                    </p>
                    <select
                        className="p-2 border rounded"
                        name="usernameSelect"
                    >
                        <option disabled selected value={undefined}>
                            -- quickly select --{" "}
                        </option>
                        {allUsers.map((user) => (
                            <option key={user.id} value={user.name}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Login
                    </button>
                    <p>
                        <span className="text-sm text-gray-500">
                            Note: This will create a new user if the username
                            doesn&apos;t exist.
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Page;
