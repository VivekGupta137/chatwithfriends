import { lorelei } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import Image from "next/image";

const UserAvatar = ({ username }: { username: string }) => {
    const avatar = createAvatar(lorelei, {
        seed: username,
    });
    return (
        <Image src={avatar.toDataUri()} alt={username} width={80} height={80} />
    );
};

export default UserAvatar;
