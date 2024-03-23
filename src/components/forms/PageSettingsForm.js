'use client';

import { faArrowUp, faCloudArrowUp, faImage, faPalette, faSave } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import SubmitButton from '../buttons/SubmitButton'
import RadioTogglers from '../formItems.js/RadioTogglers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import savePageSettings from '@/actions/pageActions';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { upload } from '@/libs/upload';
import SectionBox from '../layouts/SectionBox';
export default function PageSettingsForm({ page, users }) {

    const [bgType, setBgType] = useState(page.bgType);
    const [bgColor, bgSetColor] = useState(page.bgColor);
    const [avatar, setAvatar] = useState(users?.image);
    const [bgImage, setBgImage] = useState(page.bgImage);

    async function saveBaseSettings(formData) {
        console.log(formData.get('displayName'));
        const result = await savePageSettings(formData);
        console.log('Resulttttttt', result);
        if (result) {
            toast.success('saved');
        }
    }


    async function handleAvatarImageChange(ev) {
        await upload(ev, link => {
            setAvatar(link);
        })
    }

    async function handleCoverImageChange(ev) {
        await upload(ev, link => {
            setBgImage(link);
        });
    }

    return (
        <div>
            <SectionBox>
                <form action={saveBaseSettings}>
                    <div
                        className='bg-gray-300 py-4 -m-4 min-h-[300px]  flex items-center justify-center bg-cover bg-center'
                        style={
                            bgType === 'color' ? { backgroundColor: bgColor } : { backgroundImage: `url(${bgImage})` }
                        }
                    >
                        <div>
                            <RadioTogglers
                                defaultValue={page.bgType}
                                onChange={(val) => setBgType(val)}
                                options={[
                                    { value: 'color', icon: faPalette, label: 'Color' },
                                    { value: 'image', icon: faImage, label: 'Image' }
                                ]}
                            />
                            {bgType === 'color' && (
                                <div className='bg-gray-200 shadow text-gray-700 p-2 mt-2'>
                                    <div className='gap-2 flex justify-center'>
                                        <span>Background Color:</span>
                                        <input
                                            type='color'
                                            name='bgColor'
                                            onChange={ev => bgSetColor(ev.target.value)}
                                            defaultValue={page.bgColor} />
                                    </div>
                                </div>
                            )}

                            {bgType === 'image' && (
                                <div className='flex justify-center'>
                                    <label className='bg-white shadow px-4 py-2 mt-2'>
                                        <input type="hidden" name="bgImage" value={bgImage} />
                                        <input
                                            type='file'
                                            onChange={handleCoverImageChange}
                                            className='hidden' />
                                        <div className='flex gap-2 items-center cursor-pointer'>
                                            <FontAwesomeIcon icon={faCloudArrowUp} className='text-gray-700' />
                                            <span>
                                                Change Image
                                            </span>
                                        </div>
                                    </label>
                                </div>
                            )}

                        </div>
                    </div>
                    <div className='flex justify-center -mb-12'>
                        <div className='relative -top-8  w-[128px] h-[128px]'>
                            <div className='overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50'>
                                <Image
                                    className='w-full h-full object-cover'
                                    src={avatar}
                                    alt={'avatar'}
                                    width={128}
                                    height={128}
                                />
                            </div>

                            <label htmlFor='avatarIn' className='cursor-pointer absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center'>
                                <FontAwesomeIcon size={'xl'} icon={faCloudArrowUp} />
                            </label>
                            <input onChange={handleAvatarImageChange} id='avatarIn' type='file' className='hidden' />
                            <input type='hidden' name='avatar' value={avatar} />
                        </div>

                    </div>
                    <div className='p-0'>
                        <label className='input-label' htmlFor='nameIn'>Display Name</label>
                        <input
                            type="text"
                            id="nameIn"
                            name="displayName"
                            defaultValue={page.displayName}
                            placeholder='Joe Tribbiani'
                        />
                        <label className='input-label' htmlFor='locationIn'>Location</label>
                        <input
                            type="text"
                            id="locationIn"
                            name="location"
                            defaultValue={page.location}
                            placeholder='Somewhere in the world'
                        />
                        <label className='input-label' htmlFor='bioIn'>Bio</label>
                        <textarea
                            name="bio"
                            id="bioIn"
                            defaultValue={page.bio}
                            placeholder='Your bio goes here.'
                        />
                        <div className='max-w-[100px] mx-auto'>
                            <SubmitButton>
                                <FontAwesomeIcon icon={faSave} />
                                <span>
                                    Save
                                </span>
                            </SubmitButton>
                        </div>
                    </div>
                </form>
            </SectionBox>
        </div>
    )
}
