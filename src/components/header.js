import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";


export default async function Header() {
    const session = await getServerSession(authOptions);
    console.log('chutiyeeeee',authOptions);
    console.log(session);
    return (
        <header className="bg-white border-b py-4">
            <div className="max-w-4xl flex items-center justify-between mx-auto px-6">
                <div className="flex gap-6">
                    <Link href={'/'} className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faLink} className="text-blue-500" />
                        <span className="font-bold text-blue-500">LinkTree</span>
                    </Link>
                    <nav className="flex items-center gap-4 text-slate-500 text-sm">
                        <Link href={'/about'}>About</Link>
                        <Link href={'/pricing'}>Pricing</Link>
                        <Link href={'/contact'}>Contact</Link>
                    </nav>
                </div>
                <nav className="flex gap-4 text-slate-500 text-sm items-center">
                    {session && (
                        <>
                            <Link href={'/account'}>
                                Hello,{session?.user?.name}
                            </Link>
                            <LogoutButton />
                        </>
                    )}
                    {!session && (
                        <>
                            <Link href={'/login'}>Sign In</Link>
                            <Link href={'/register'}>Create Account</Link>
                        </>
                    )}

                </nav>
            </div>
        </header>
    );
}