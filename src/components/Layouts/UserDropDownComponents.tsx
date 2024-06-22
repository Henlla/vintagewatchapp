import { useState } from "react"

const UserDropDownComponents = ({ handleLogout, loggedUser }: any) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleButtonClick = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return <>
        <div className="relative ml-3">
            <div>
                <button onClick={handleButtonClick} type="button" className="relative flex rounded-md bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-md" src={loggedUser && loggedUser.avatar} alt="" />
                </button>
            </div>
            <div className={`absolute ${!isDropdownOpen ? 'hidden' : ''} right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button"`}>
                <a href="/profile" className="block hover:bg-slate-400 hover:text-white px-4 py-2 text-sm text-gray-700">Profile</a>
                <a href="#" onClick={handleLogout} className="hover:bg-slate-400 hover:text-white block px-4 py-2 text-sm text-gray-700">Sign out</a>
            </div>
        </div>

    </>;
}

export default UserDropDownComponents;