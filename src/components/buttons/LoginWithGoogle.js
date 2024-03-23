'use client'
import React from 'react'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn } from "next-auth/react";

function LoginWithGoogle() {    
    console.log('bhawaaaaaa')
    return (
        <button className='bg-white shadow text-black w-full py-2 rounded mt-6 flex items-center gap-2 justify-center'
            onClick={() => signIn('google')}>
            <FontAwesomeIcon icon={faGoogle} className='h-6' />
            <span>Sign In with Google</span>
        </button>
    )
}

export default LoginWithGoogle