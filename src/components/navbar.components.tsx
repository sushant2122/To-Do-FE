import { useState } from 'react'

function NavbarComponent() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default mb-24 pb-30">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                    {/* Logo */}
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">

                        <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
                            Taskly
                        </span>
                    </a>

                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
                        aria-controls="navbar-default"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeWidth="2"
                                d="M5 7h14M5 12h14M5 17h14"
                            />
                        </svg>
                    </button>

                    {/* Menu */}
                    <div
                        className={`${isOpen ? 'block' : 'hidden'
                            } w-full md:block md:w-auto`}
                        id="navbar-default"
                    >
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">

                            <li>
                                <a
                                    href="#"
                                    onClick={() => setIsOpen(false)}
                                    className="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                                >
                                    Home
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    onClick={() => setIsOpen(false)}
                                    className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0"
                                >
                                    Home
                                </a>
                            </li>



                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavbarComponent