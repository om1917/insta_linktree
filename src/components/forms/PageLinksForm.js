'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layouts/SectionBox";
import { faCloudArrowUp, faGripLines, faLink, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { upload } from "@/libs/upload";
import Image from "next/image";
import { savePageLinks } from "@/actions/pageActions";
import toast, { Toaster } from 'react-hot-toast';

export default function PageLinksForm({ page }) {
    const [links, setLinks] = useState(page.links || []);
    async function save() {
        await savePageLinks(links);
        toast.success('Saved!');
    }

    function addNewLink() {
        setLinks(prev => {
            return [...prev, {
                key: Date.now().toString(),
                title: '',
                subtitle: '',
                icon: '',
                uri: ''
            }];
        });
    }

    function handleUpload(ev, linkKeyForUpload) {
        upload(ev, uploadedImageUrl => {
            setLinks(prevLinks => {
                const newLinks = [...prevLinks];
                newLinks.forEach((value) => {
                    if (value.key === linkKeyForUpload) {
                        value.icon = uploadedImageUrl;
                    }
                })
                return newLinks;
            })
        });
    }

    function handleLinkChange(keyOfLinkToChange, prop, ev) {
        setLinks(prev => {
            const newLinks = [...prev];
            newLinks.forEach((value) => {
                if (value.key === keyOfLinkToChange) {
                    value[prop] = ev.target.value;
                }
            })
            return newLinks;
        })
    }

    function removeLink(linkKeyToRemove){
        setLinks(prevLinks => {
            const newLinks = [...prevLinks].filter(prev => prev.key !== linkKeyToRemove);
            return newLinks;
        });
    }

    return (
        <SectionBox>
            <form action={save}>
                <h2 className="text-2xl font-bold mb-4">Links</h2>
                <button
                    type="button"
                    onClick={addNewLink}
                    className="text-blue-500 text-lg flex gap-2 items-center">
                    <FontAwesomeIcon className="bg-blue-500 text-white p-1 rounded-full aspect-square" icon={faPlus} />
                    <span>
                        Add New
                    </span>
                </button>
                <div className="">
                    <ReactSortable
                        handle={'.handle'}
                        list={links}
                        setList={setLinks}>
                        {links.map(l => (
                            // eslint-disable-next-line react/jsx-key
                            <div key={l.key} className="mt-8 flex gap-8 items-center">
                                <div className="handle">
                                    <FontAwesomeIcon
                                        className="text-gray-700 mr-2 cursor-pointer"
                                        icon={faGripLines} />
                                </div>

                                <div className="text-center">
                                    <div className="bg-gray-300 inline-flex items-center  w-16 h-16 justify-center relative aspect-square">
                                        {l.icon && (
                                            <Image
                                                className="object-cover w-full h-full"
                                                src={l.icon}
                                                alt={'icon'}
                                                width={64}
                                                height={64} />
                                        )}
                                        {!l.icon && (
                                            <FontAwesomeIcon size="xl" icon={faLink} />
                                        )}
                                    </div>
                                    <div>
                                        {/* {JSON.stringify(l.icon)} */}
                                        <input
                                            onChange={ev => handleUpload(ev, l.key)}
                                            id={'icon' + l.key}
                                            type="file"
                                            className="hidden" />
                                        <label htmlFor={'icon' + l.key} className="border mt-2 mb-2 p-2 flex items-center gap-1 rounded-md text-gray-700 cursor-pointer justify-center">
                                            <FontAwesomeIcon icon={faCloudArrowUp} />
                                            Change Icon
                                        </label>
                                        <button 
                                            onClick={() => removeLink(l.key)}
                                            type="button" 
                                            className="bg-gray-300 py-2 px-2 mb-2 flex gap-1 items-center rounded-md">
                                            <FontAwesomeIcon icon={faTrash} />
                                            <span>
                                                Remove this link
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="grow">
                                    {/* {l.key} */}
                                    <label className="input-label">Title:</label>
                                    <input value={l.title} onChange={ev => handleLinkChange(l.key, 'title', ev)} type="text" placeholder="title" />
                                    <label className="input-label">Subtitle:</label>
                                    <input value={l.subtitle} onChange={ev => handleLinkChange(l.key, 'subtitle', ev)} type="text" placeholder="subtitle (optional)" />
                                    <label className="input-label">URI:</label>
                                    <input value={l.uri} onChange={ev => handleLinkChange(l.key, 'uri', ev)} type="text" placeholder="uri" />
                                </div>
                            </div>
                        ))}
                    </ReactSortable>

                </div>
                <div className="border-t pt-4 mt-4 ">
                    <SubmitButton className="mx-auto max-w-xs">
                        <FontAwesomeIcon icon={faSave} />
                        <span>Save</span>
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    )
}