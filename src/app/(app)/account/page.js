import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import UsernameForm from '@/components/forms/UsernameForm';
import { Page } from '@/models/Page';
import mongoose from "mongoose";
import PageSettingsForm from '@/components/forms/PageSettingsForm';
import PageButtonsForm from '@/components/forms/PageButtonsForm';
import PageLinksForm from '@/components/forms/PageLinksForm';

export default async function AccountPage({ searchParams }) {
    
    const session = await getServerSession(authOptions);
    const desiredUserName = searchParams?.username;
    if (!session) {
        return redirect('/');
    }
    mongoose.connect(process.env.MONGODB_URI);
    const page = await Page.findOne({
        owner: session?.user?.email
    })

    //console.log('Bsdkeeeee',page);
    if(page){
        return(
            <>
                <PageSettingsForm page={page} users={session.user} />
                {/* {page.buttons.buttonsValues && <PageButtonsForm page={page} users={session.user} />}                 */}
                <PageButtonsForm page={page} users={session.user} />
                <PageLinksForm page={page} users={session.user}  />
            </>
        );
    }

    return (
        <div>
            <UsernameForm desiredUserName={desiredUserName}/>
        </div>
    )
}
