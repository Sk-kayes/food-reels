import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../../config/api";

const CreateFood = () => {
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ videoFile, setVideoFile ] = useState(null);
    const [ videoURL, setVideoURL ] = useState('');
    const [ fileError, setFileError ] = useState('');
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!videoFile) {
            setVideoURL('');
            return;
        }
        const url = URL.createObjectURL(videoFile);
        setVideoURL(url);
        return () => URL.revokeObjectURL(url);
    }, [ videoFile ]);

    const onFileChange = (e) => {
        const file = e.target.files && e.target.files[ 0 ];
        if (!file) { setVideoFile(null); setFileError(''); return; }
        if (!file.type.startsWith('video/')) { setFileError('Please select a valid video file.'); return; }
        setFileError('');
        setVideoFile(file);
    };

    const onDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer?.files?.[ 0 ];
        if (!file) { return; }
        if (!file.type.startsWith('video/')) { setFileError('Please drop a valid video file.'); return; }
        setFileError('');
        setVideoFile(file);
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const openFileDialog = () => fileInputRef.current?.click();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('description', description);
        formData.append("video", videoFile);

        const response = await axios.post(`${API_BASE_URL}/api/food`, formData, {
            withCredentials: true,
        })

        console.log(response.data);
        navigate("/");
    };

    const isDisabled = useMemo(() => !name.trim() || !videoFile, [ name, videoFile ]);

    return (
        <div className="min-h-screen flex items-start justify-center p-6 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="w-full max-w-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-6 flex flex-col gap-5">
                <header className="grid gap-2">
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Create Food</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Upload a short video, give it a name, and add a description.</p>
                </header>

                <form className="grid gap-5 md:gap-6" onSubmit={onSubmit}>
                    <div className="grid gap-1.5">
                        <label htmlFor="foodVideo" className="text-xs uppercase tracking-wider font-bold text-slate-600 dark:text-slate-400">Food Video</label>
                        <input
                            id="foodVideo"
                            ref={fileInputRef}
                            className="absolute w-px h-px p-0 -m-px overflow-hidden clip-rect-0 whitespace-nowrap border-0"
                            type="file"
                            accept="video/*"
                            onChange={onFileChange}
                        />

                        <div
                            className="border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50/70 dark:bg-slate-700/70 rounded-md p-6 cursor-pointer select-none transition-all duration-200 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 active:translate-y-px focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                            role="button"
                            tabIndex={0}
                            onClick={openFileDialog}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFileDialog(); } }}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                        >
                            <div className="grid place-items-center text-center gap-3 text-slate-600 dark:text-slate-400">
                                <svg className="text-blue-500 dark:text-blue-400" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M10.8 3.2a1 1 0 0 1 .4-.08h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v7.2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6.4a1 1 0 0 1 1-1h1.6V3.2a1 1 0 0 1 1-1h1.6a1 1 0 0 1 .6.2z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M9 12.75v-1.5c0-.62.67-1 1.2-.68l4.24 2.45c.53.3.53 1.05 0 1.35L10.2 16.82c-.53.31-1.2-.06-1.2-.68v-1.5" fill="currentColor" />
                                </svg>
                                <div className="text-slate-900 dark:text-white">
                                    <strong>Tap to upload</strong> or drag and drop
                                </div>
                                <div className="text-sm">MP4, WebM, MOV • Up to ~100MB</div>
                            </div>
                        </div>

                        {fileError && <p className="text-red-600 dark:text-red-400 text-sm mt-2" role="alert">{fileError}</p>}

                        {videoFile && (
                            <div className="mt-3 flex flex-wrap items-center gap-3 p-2 px-3 rounded-md w-full bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600" aria-live="polite">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="text-slate-600 dark:text-slate-400">
                                    <path d="M9 12.75v-1.5c0-.62.67-1 1.2-.68l4.24 2.45c.53.3.53 1.05 0 1.35L10.2 16.82c-.53.31-1.2-.06-1.2-.68v-1.5" />
                                </svg>
                                <span className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap text-slate-900 dark:text-white">{videoFile.name}</span>
                                <span className="text-sm text-slate-600 dark:text-slate-400 ml-auto">{(videoFile.size / 1024 / 1024).toFixed(1)} MB</span>
                                <div className="inline-flex items-center gap-2">
                                    <button type="button" className="bg-transparent border border-transparent text-blue-600 dark:text-blue-400 px-2.5 py-1.5 rounded-full font-bold tracking-wide cursor-pointer transition-colors hover:bg-blue-600/10 dark:hover:bg-blue-400/10 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2" onClick={openFileDialog}>Change</button>
                                    <button type="button" className="bg-transparent border border-transparent text-red-600 dark:text-red-400 px-2.5 py-1.5 rounded-full font-bold tracking-wide cursor-pointer transition-colors hover:bg-red-600/10 dark:hover:bg-red-400/10 focus-visible:outline-2 focus-visible:outline-red-600 focus-visible:outline-offset-2" onClick={() => { setVideoFile(null); setFileError(''); }}>Remove</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {videoURL && (
                        <div className="w-full rounded-md overflow-hidden border border-dashed border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 grid place-items-center">
                            <video className="w-full h-full block bg-black object-contain" src={videoURL} controls playsInline preload="metadata" />
                        </div>
                    )}

                    <div className="grid gap-1.5">
                        <label htmlFor="foodName" className="text-xs uppercase tracking-wider font-bold text-slate-600 dark:text-slate-400">Name</label>
                        <input
                            id="foodName"
                            type="text"
                            placeholder="e.g., Spicy Paneer Wrap"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="appearance-none border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 p-2.5 px-3 rounded-md outline-none text-slate-900 dark:text-white transition-all duration-200 focus-visible:border-blue-500 dark:focus-visible:border-blue-400 focus-visible:shadow-[0_0_0_3px_rgba(59,130,246,0.55)] focus-visible:bg-white dark:focus-visible:bg-slate-800"
                        />
                    </div>

                    <div className="grid gap-1.5">
                        <label htmlFor="foodDesc" className="text-xs uppercase tracking-wider font-bold text-slate-600 dark:text-slate-400">Description</label>
                        <textarea
                            id="foodDesc"
                            rows={4}
                            placeholder="Write a short description: ingredients, taste, spice level, etc."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="appearance-none border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 p-2.5 px-3 rounded-md outline-none text-slate-900 dark:text-white resize-y min-h-24 transition-all duration-200 focus-visible:border-blue-500 dark:focus-visible:border-blue-400 focus-visible:shadow-[0_0_0_3px_rgba(59,130,246,0.55)] focus-visible:bg-white dark:focus-visible:bg-slate-800"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button 
                            className="bg-blue-600 text-white border-none rounded-md py-3 px-4 font-bold tracking-wide cursor-pointer transition-all duration-200 hover:bg-blue-700 active:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed" 
                            type="submit" 
                            disabled={isDisabled}
                        >
                            Save Food
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateFood;