//import { buttons, buttonsIcons } from "@/components/forms/PageButtonsForm";
import { Page } from "@/models/Page";
import { Statistics } from "@/models/Statistics";
import { User } from "@/models/User";
import { faDiscord, faFacebook, faGithub, faInstagram, faLinkedin, faTwitch, faTwitter, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLink, faLocationDot, faPhone, faUpload } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";


/*
const icons = {};
buttons.forEach(b => {
    icons[b.key] = b.icon
});
*/
export const iconsButton = {
    email: faEnvelope,
    mobile: faPhone,
    instagram: faInstagram,
    facebook: faFacebook,
    discord: faDiscord,
    twitter: faTwitter,
    youtube: faYoutube,
    github: faGithub,
    twitch: faTwitch,
    linkedin: faLinkedin,
    whatsapp: faWhatsapp,
    upwork: faUpload,
};

function buttonLink(key,value){
    if(key === 'mobile'){
        return 'tel:'+value;
    }
    if(key === 'email'){
        return 'mailto:'+value;    
    }
}


export default async function UserPage(props) {
    const uri = decodeURIComponent(props.params.uri);

    mongoose.connect(process.env.MONGODB_URI);
    const page = await Page.findOne({ uri });
    const user = await User.findOne({ email: page.owner });
    await Statistics.create({uri:uri,page:uri,type:'view'});

    return (
        <div className="bg-blue-950 text-white min-h-screen ">
            <div
                className="h-36 bg-gray-400 bg-cover bg-center"
                style={
                    page.bgType === 'color' ? { backgroundColor: page.bgColor } : { backgroundImage: `url(${page.bgImage})` }
                }
            >
            </div>
            <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-14">
                <Image
                    className="rounded-full w-full h-full object-cover"
                    alt="avatar"
                    src={user.image}
                    width={256}
                    height={256} />
            </div>

            <h2 className="text-xl text-center mb-1">
                {page.displayName}
            </h2>
            <h3 className="text-md flex gap-2 justify-center items-center text-white/70">
                <FontAwesomeIcon className="h-8" icon={faLocationDot} />
                <span>
                    {page.location}
                </span>
            </h3>
            <div className="max-w-xs mx-auto text-center mt-2">
                <p>
                    {page.bio}
                </p>
            </div>
            <div className="flex gap-2 justify-center pb-4 mt-4">
                
                {Object.keys(page.buttons.buttonsValues).map(buttonKey => (
                    // eslint-disable-next-line react/jsx-key
                    <Link href={'/'} className="rounded-full bg-white text-blue-950 p-2 flex items-center justify-center">
                        {/* <Link href={buttonLink(buttonKey,page.buttons.buttonsValues[buttonKey])}  */}
                       
                        {/* {buttons.find(b => b.key === buttonKey).icon} */}
                        {/* <FontAwesomeIcon className="w-6 h-6" icon={faEnvelope} /> */}
                        <FontAwesomeIcon className="w-5 h-5" icon={iconsButton[buttonKey]} />
                        {/* 
                        {buttonKey}:
                        {page.buttons.buttonsValues[buttonKey]} 
                        */}
                    </Link>
                ))}
                {/* {JSON.stringify(page.buttons.buttonsValues["discord"])} */}


                {/* {page.buttons.buttonsValues.map(button => (
                    // eslint-disable-next-line react/jsx-key
                    <Link href={''}>
                        {button.icon}
                    </Link>
                ))} */}
            </div>
            <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6 p-4 px-8">
                {page.links.map(link => (
                    // eslint-disable-next-line react/jsx-key
                    <Link 
                        target="_blank"
                        ping={process.env.URL+'api/click?uri='+ btoa(link.uri)+'&page='+page.uri }
                        className="bg-indigo-800 p-2 flex"
                        href={link.uri}>
                        <div className="bg-blue-700 aspect-square relative -left-4 overflow-hidden">
                            <div className="w-16 h-16 bg-blue-700 aspect-square relative flex item-center justify-center">
                                {link.icon && (
                                    <Image className="w-full h-full object-cover" src={link.icon} alt={'icon'} height={64} width={64} />
                                )}
                                {!link.icon && (
                                    <FontAwesomeIcon icon={faLink} className="w-8 h-8" />
                                )}
                            </div>
                            
                        </div>
                        <div className="flex items-center justify-center shrink group-0">
                            <div className="">
                                <h3>{link.title}</h3>
                                <p className="text-white/50 h-6 overflow-hidden">{link.subtitle}</p>
                            </div>
                            
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}