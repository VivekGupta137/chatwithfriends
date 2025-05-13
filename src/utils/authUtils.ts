import { cookies } from "next/headers";
import { encodeBase64, decodeBase64 } from "@oslojs/encoding";
import { cache } from "react";

type User = {
    id: string;
    name: string;
};

export type SessionValidationResult = { user: User } | { user: null };

export const impersonateUser = async (user: User): Promise<void> => {
    const token = generateSessionToken(user);
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    await deleteSessionTokenCookie();
    await setSessionTokenCookie(token, expiresAt);
};

export const getSession = cache(async (): Promise<SessionValidationResult> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value ?? null;
    if (token === null) {
        return { user: null };
    }
    const result = decodeBase64(token);

    if (result === null) {
        return { user: null };
    }
    const decoder = new TextDecoder();
    const jsonString = decoder.decode(result);
    const user: User = JSON.parse(jsonString);
    if (!user || !user.id || !user.name) {
        return { user: null };
    }
    if (typeof user.id !== "string" || typeof user.name !== "string") {
        return { user: null };
    }

    return { user };
});

export function generateSessionToken(user: User): string {
    const jsonString = JSON.stringify(user);
    const data: Uint8Array = new TextEncoder().encode(jsonString);
    const token = encodeBase64(data);
    console.log("token", token);

    return token;
}

export const setSessionTokenCookie = async (token: string, expiresAt: Date) => {
    const cookieStore = await cookies();

    cookieStore.set("session", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        path: "/",
    });
};

export async function deleteSessionTokenCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set("session", "", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: "/",
    });
}
