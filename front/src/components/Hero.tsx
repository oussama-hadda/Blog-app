'use client';

const Hero: React.FC = () => {
    return (
        <section
            className="h-screen bg-cover bg-center text-white overflow-hidden"
            style={{backgroundImage: "url('/path-to-your-image.jpg')"}}
        >
            <div className="relative flex flex-col h-full p-8">
                <div className="absolute left-10 bottom-20">
                    <div className="self-start">
                        <button>
                            <span
                                className="inline-flex items-center justify-center px-2 py-2 rounded-full text-md font-medium bg-white/20 text-white whitespace-nowrap min-w-[100px] transition-all hover:bg-white/40 active:bg-white/60 backdrop-blur-lg hover:shadow-md"
                            >Destination</span>
                        </button>
                    </div>
                    <h1 className="text-4xl font-bold mt-4">Exploring the Wonders of Hiking</h1>
                    <p className="mt-2 max-w-md">
                        An iconic landmark, this post unveils the secrets that make this destination a traveler's
                        paradise.
                    </p>
                </div>
                <div className="absolute right-10 bottom-20 space-y-4 flex flex-col items-end">
                        <div className= "flex flex-row items-center space-x-2">
                            <img src="/images/default_profile.jpg" alt="Author" className="w-8 h-8 rounded-full"/>
                            <p>Theodore Reginald</p>
                        </div>
                        <p className="text-sm text-gray-400">24 Jan 2024 • 10 mins read</p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
