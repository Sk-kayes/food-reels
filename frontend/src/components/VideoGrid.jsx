import React from 'react';
import { Link } from 'react-router-dom';

const VideoGrid = ({ videos, className = "grid grid-cols-3 gap-2" }) => {
    return (
        <section className={className} aria-label="Videos">
            {videos.map((v) => (
                <Link 
                    key={v._id} 
                    to={`/video/${v.food?._id || v._id}`}
                    className="aspect-[3/4] block"
                >
                    <video
                        className="h-full w-full object-cover rounded hover:opacity-80 transition-opacity"
                        src={v.food?.video || v.video}
                        muted
                    />
                </Link>
            ))}
        </section>
    );
};

export default VideoGrid;