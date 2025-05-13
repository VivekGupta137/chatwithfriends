import { HOME_PAGE, IMPERSONATE_PAGE } from "@/constants/pageRoutes";
import { makeUrl } from "@/utils/utilityFunctions";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="flex justify-between container mx-auto flex-wrap">
            <Link href={makeUrl(HOME_PAGE)} className="text-3xl font-bold">
                Chatterbox
            </Link>
            <Link
                href={makeUrl(IMPERSONATE_PAGE)}
                className="underline flex items-center text-xl"
            >
                Impersonate <ExternalLink className="ml-2 size-4" />
            </Link>
        </div>
    );
};

export default Navbar;
