'use client'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function LogoutButton({
    className = 'flex gap-2 p-2 border items-center shadow px-4',
    iconLeft = false,
    iconClasses = '',
}) {
    return (
        <button className={className} onClick={() => signOut()}>
            {iconLeft && (<FontAwesomeIcon icon={faRightFromBracket} className={iconClasses} />)}
            <span>Logout</span>
            {!iconLeft && (<FontAwesomeIcon icon={faRightFromBracket} className={iconClasses} />)}
        </button>
    )
}


