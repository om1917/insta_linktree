"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function grabUserName(formData) {
    const username = formData.get('username');
    console.log('gandudddd',username);
    mongoose.connect(process.env.MONGODB_URI);
    console.log('userNameee',username)
    const existingPageDoc = await Page.findOne({ uri: username });
    console.log('UserNamee',existingPageDoc)
    if (existingPageDoc) {
        //redirect('/account?usernameTaken=1');
        return false;
    }
    else {
        const session = await getServerSession(authOptions);
        console.log('emaillll',session?.user?.email);
        return await Page.create({
            uri: username,
            owner: session?.user?.email,
        });
    }


}