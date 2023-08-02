'use client'
import Link from "next/link"
import { usePathname } from "next/navigation";

const links = [
    { name: 'Exhibition', link: '/exhibition' },
    { name: 'Contacts', link: '/contacts' },
]

const Header = () => {
    const pathname = usePathname()

    return (
        <div className={`w-full h-[100px] fixed backdrop-blur-sm flex items-center justify-between ${pathname === '/' ? 'text-white' : ''}`}>
            <div className="ml-5 flex">
                <div className="mr-5">
                    <Link
                        href={'/'}
                        className="text-xl"
                    >
                        ART GALLERY
                    </Link>
                </div>
                <nav>
                    {
                        links.map(link => (
                            <Link
                                key={link.name}
                                href={link.link}
                                className={`mr-2 ${pathname === link.link ? 'border-b-2 border-black' : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))
                    }
                </nav>
            </div>
            <p className="mr-5">
                today: 10am - 6pm
            </p>
        </div>
    )
}

export default Header
