'use client'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft,faChartLine} from "@fortawesome/free-solid-svg-icons";
import { faFileLines} from "@fortawesome/free-regular-svg-icons";
import LogoutButton from "@/components/buttons/LogoutButton";
import { usePathname, useRouter } from "next/navigation";


export default function AppSideBar() {
    //const router = useRouter();
    const path = usePathname();
    console.log(path);
    return (
        <nav className="mx-auto inline-flex flex-col text-center mt-6 gap-6 text-gray-500">
            <Link
                href={'/account'}
                className={
                    "flex gap-4 "
                    + (path === '/account' ? 'text-blue-500 font-bold' : '')
                }>
                <FontAwesomeIcon fixedWidth={true} icon={faFileLines} className="w-6 h-6" />
                <span>
                    My page
                </span>
            </Link>
            <Link
                href={'/analytics'}
                className={
                    "flex gap-4 "
                    + (path === '/analytics' ? 'text-blue-500 font-bold' : '')
                }>
                <FontAwesomeIcon fixedWidth={true} icon={faChartLine} className="w-6 h-6" />
                <span>
                    Analytics
                </span>
            </Link>
            <LogoutButton iconClasses={'h-6 w-6'} iconLeft={true} className={'flex gap-2 items-center text-gray-500'} />
            <Link href={'/'} className="flex gap-2 items-center text-sm text-gray-500 border-t pt-4">
                <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                <span>
                    Back to Website
                </span>
            </Link>
        </nav>
    )
}
