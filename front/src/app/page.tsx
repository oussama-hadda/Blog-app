'use client';

import Header from '../components/Header';
import Hero from '../components/Hero';

export default function Home() {
    const backgroundImage = "/images/beach.jpg";  // Background image for both components

    return (
        <div className="bg-white">
            <div className="p-2">
                <div
                    className="relative bg-cover bg-center bg-local rounded-lg overflow-hidden"
                    style={{backgroundImage: `url(${backgroundImage})`}}
                >
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                    <Header/>
                    <Hero/>
                </div>
            </div>
        </div>
    );
}
