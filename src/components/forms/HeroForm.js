'use client';

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeroForm({ user }) {
    const [userName, setUserName] = useState("");
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem('userName')) {
            const username = localStorage.getItem('userName');
            localStorage.removeItem('userName');
            redirect('/account?username=' + username);
        }
    }, []);

    async function handleSubmit(ev) {
        ev.preventDefault();
        console.log('alpha', userName);
        if (userName.length > 0) {
            if (user) {
                //redirect('/account?username=' + userName);
                router.push('/account?username=' + userName);
            }
            else {
                localStorage.setItem('userName', userName);
                await signIn('google');
            }

            /* 
            await signIn('google',{
                redirect:'/account?username='+ userName,
            });
            */
        }
    }

    return (
        <>
            {/* <form onSubmit={handleSubmit} className="inline-flex items-center shadow-lg shadow-black/20">
                <span className="bg-white py-4 pl-4">linklist.to/</span>
                <input value={userName} onChange={ev => setUserName(ev.target.value)} type="text" className="rounded mr-1 py-4" placeholder="username" />
                <button type="submit" className="bg-blue-500 text-white py-4 px-6 rounded-md">
                    Join for free
                </button>
            </form> */}
            <form
                onSubmit={handleSubmit}
                className="inline-flex items-center shadow-lg bg-white shadow-gray-500/20">
                <span className="bg-white py-4 pl-4">
                    linklist.to/
                </span>
                <input
                    type="text"
                    className=""
                    style={{ backgroundColor: 'white', marginBottom: 0, paddingLeft: 0 }}
                    placeholder="username" />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-4 px-6 whitespace-nowrap">
                    Join for Free
                </button>
            </form>
        </>
    )
}

