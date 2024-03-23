'use client';
import React, { useState } from 'react'
import RightIcon from '@/components/icons/RightIcon';
import grabUserName from '@/actions/grabUserName';
import UsernameFormValidation from '../formResults/UsernameFormValidation';
import { redirect } from 'next/navigation';
import SubmitButton from '../buttons/SubmitButton';

export default function UsernameForm({ desiredUserName }) {
    const [taken, setTaken] = useState(false);

    async function handleSubmit(formData) {
        const result = await grabUserName(formData);

        if (result === false) setTaken(true);
        else setTaken(false);

        if (result) {
            redirect('/account?created='+ formData.get('username'));
        }
    }
    // const [state, formAction] = useFormState(grabUserName);
    // //const info = useFormStatus();
    // console.log('stateeeee', { state });
    //console.log('blllllaaa',location.href.includes('usernameTaken'));
    return (
        <form action={handleSubmit}>
            <h1 className='text-4xl font-bold text-center mb-2'>
                Grab your username
            </h1>
            <p className='text-center mb-6 text-grey-500'>
                Choose your username.
            </p>
            <div className='max-w-xs mx-auto'>
                <input
                    name='username'
                    type='text'
                    className='text-center w-full block p-2 mx-auto border rounded'
                    placeholder='UserName'
                    defaultValue={desiredUserName}
                />
                {taken && <UsernameFormValidation />}
                <SubmitButton >
                    <span>
                        Claim your Username
                    </span>
                    <RightIcon />
                </SubmitButton>
            </div>
        </form>
    )
}