'use client'
import React, { useState } from 'react'
import SectionBox from '../layouts/SectionBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faGripLines, faMobile, faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faFacebook, faGithub, faInstagram, faLinkedin, faTwitch, faTwitter, faUpwork, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import SubmitButton from '../buttons/SubmitButton'
import { savePageButtons } from '@/actions/pageActions'
import toast, { Toaster } from 'react-hot-toast';
import { ReactSortable } from "react-sortablejs";



export const buttons = [
    { key: 'email', 'label': 'e-mail', icon: faEnvelope, placeholder: 'test@example.com' },
    { key: 'mobile', 'label': 'mobile', icon: faMobile, placeholder: '+91 1231231231' },
    { key: 'instagram', 'label': 'instagram', icon: faInstagram, placeholder: 'https://instagram.com/profile/...' },
    { key: 'facebook', 'label': 'facebook', icon: faFacebook, placeholder: 'https://facebook.com/profile/...' },
    { key: 'discord', 'label': 'discord', icon: faDiscord, placeholder: 'https://discord.com/profile/...' },
    { key: 'twitter', 'label': 'twitter', icon: faTwitter, placeholder: 'https://twitter.com/profile/...' },
    { key: 'youtube', 'label': 'youtube', icon: faYoutube, placeholder: 'https://youtube.com/...' },
    { key: 'github', 'label': 'github', icon: faGithub, placeholder: 'https://github.com/profile/...' },
    { key: 'twitch', 'label': 'twitch', icon: faTwitch, placeholder: 'https://twitch.com/profile/...' },
    { key: 'linkedin', 'label': 'linkedin', icon: faLinkedin, placeholder: 'https://linkedin.com/profile/...' },
    { key: 'whatsapp', 'label': 'whatsapp', icon: faWhatsapp, placeholder: 'https://whatsapp.com/...' },
    { key: 'upwork', 'label': 'upwork', icon: faUpwork, placeholder: 'https://upwork.com/profile/...' },
];

export default function PageButtonsForm({ page }) {
    console.log({ page });
    const pageSavedButtonKeys = Object.keys(page.buttons.buttonsValues);
    const pageSavedButtonsInfo = pageSavedButtonKeys.map(k => buttons.find(b => b.key === k));
    const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);

    function addButtonToProfile(button) {
        if (button) {
            setActiveButtons(prevButtons => {
                return [...prevButtons, button]
            })
        }
    }

    function camelCase(str) {
        return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
    }

    async function saveButtons(formData) {
        await savePageButtons(formData);
        toast.success('Settings saved!');
    }
    const availableButtons = buttons.filter(b1 => !activeButtons.find(b2 => b1.key === b2.key));

    function removeButton({ key: keyToRemove }) {
        setActiveButtons(prevButtons => {
            return prevButtons.filter(button => button.key !== keyToRemove);
        });
    }

    return (
        <SectionBox>
            <form action={saveButtons}>
                <h2 className='text-2xl font-bold mb-4'>Buttons</h2>
                <ReactSortable handle={'.handle'} list={activeButtons} setList={setActiveButtons}>
                    {activeButtons.map(b => (
                        // eslint-disable-next-line react/jsx-key
                        <div key={b.key} className='mb-4 flex items-center'>
                            <div className='w-48 flex h-full p-2 gap-2 items-center text-gray-700' >
                                <FontAwesomeIcon icon={faGripLines} className='curson-pointer text-gray-400 handle' />
                                <FontAwesomeIcon icon={b.icon} />
                                <span>
                                    {camelCase(b.label)}:
                                </span>
                            </div>
                            <input
                                name={b.key}
                                type='text'
                                defaultValue={page.buttons.buttonsValues[b.key]}
                                placeholder={b.placeholder} />
                            <button
                                type='button'
                                onClick={() => removeButton(b)}
                                className='bg-gray-500 py-2 px-4 cursor-pointer'>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ))}
                </ReactSortable>

                <div className='flex flex-wrap gap-2 mt-4 border-y py-4'>
                    {availableButtons.map(buttonObject => (
                        // eslint-disable-next-line react/jsx-key
                        <button
                            type='button'
                            onClick={() => addButtonToProfile(buttonObject)}
                            className='flex gap-1 items-center p-1 bg-gray-300'>
                            <FontAwesomeIcon icon={buttonObject.icon} />
                            <span className=''>
                                {camelCase(buttonObject.label)}
                            </span>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    ))}
                </div>
                <div className='max-w-xs mx-auto mt-8'>
                    <SubmitButton>
                        <FontAwesomeIcon icon={faSave} />
                        <span>
                            Save
                        </span>
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    )
}

