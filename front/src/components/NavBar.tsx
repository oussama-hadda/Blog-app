import Link from "next/link";

const navElements = [
    { href: '#', name: 'Hotel' },
    { href: '#', name: 'Flight' },
    { href: '#', name: 'Train' },
    { href: '#', name: 'Travel' },
    { href: '#', name: 'Car Rental' },
]

const NavBar = () => {
    return (
        <nav className="flex space-x-6">
            {navElements.map((element) => (
                <Link
                    key={element.name}
                    href={element.href}
                    className="
                        relative
                        hover:text-cyan-400
                        active:text-cyan-600
                        transition
                        duration-300
                        ease-in-out
                        hover:scale-105
                        active:scale-95
                    "
                >
                    <span className="hover-underline">{element.name}</span>
                </Link>
            ))}
            <style jsx>{`
                .hover-underline::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: -2px;
                    height: 2px;
                    background-color: currentColor;
                    transform: scaleX(0);
                    transition: transform 0.3s ease;
                }

                .hover-underline:hover::after {
                    transform: scaleX(1);
                }
            `}</style>
        </nav>
    )
}


export default NavBar
