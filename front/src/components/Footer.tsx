import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white py-10 rounded-lg">
            <div className="mx-auto px-6 lg:flex lg:space-x-4">
                <div className="mb-6 lg:mb-0 lg:w-1/3">
                    <h1 className="text-2xl font-bold mb-2">Nature</h1>
                    <p className="text-sm mb-2">
                        Our mission is to equip modern explorers with cutting-edge, functional, and stylish bags that
                        elevate every adventure.
                    </p>
                    <p className="text-sm">©2024 Nature. All rights reserved.</p>
                </div>
                <div className="mb-6 lg:mb-0 lg:w-1/3">
                    <h2 className="text-lg font-semibold mb-4">About</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-gray-400">About Us</a></li>
                        <li><a href="#" className="hover:text-gray-400">Blog</a></li>
                        <li><a href="#" className="hover:text-gray-400">Career</a></li>
                    </ul>
                </div>
                <div className="lg:w-1/3">
                    <h2 className="text-lg font-semibold mb-4">Support</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-gray-400">Contact Us</a></li>
                        <li><a href="#" className="hover:text-gray-400">Return</a></li>
                        <li><a href="#" className="hover:text-gray-400">FAQ</a></li>
                    </ul>
                </div>
                <div className="mt-6 lg:mt-0 lg:w-1/3">
                    <h2 className="text-lg font-semibold mb-4">Get Updates</h2>
                    <form className="flex items-center space-x-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="p-2 w-full text-black rounded-md focus:outline-none"
                        />
                        <button type="submit" className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md">
                            Subscribe
                        </button>
                    </form>
                    <div className="mt-4 flex space-x-4 text-sm">
                        <a href="#" className="hover:text-gray-400">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-400">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
