import { useEffect, useState } from "react";
import { logo } from "../constant/media"
import { FiBell, FiMenu, FiMessageSquare } from "react-icons/fi";
import { navItems } from "../constant/data";
import requestClient from "../lib/httpRequest";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { UserType } from "../constant/global";

const Navbar = () => {

    const [active, setActive] = useState<string>("Revenue");
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);

    const fetchingCurrentUser = async () => {
        try {
            const response = await requestClient().get('/user');
            setCurrentUser(response?.data);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    }
    useEffect(() => {
        fetchingCurrentUser();
    }, []);

    return (
        <div className="sticky top-0 bg-white shadow-lg rounded-full p-6 h-16 flex items-center justify-between gap-80 mx-auto z-50">
            <img src={logo} alt="logo" className="h-9 w-9 object-contain" />
            <div className="flex items-center justify-between w-full gap-10">
                <div className="flex items-center justify-center gap-6 py-3">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActive(item.label)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
                    ${active === item.label
                                    ? "bg-black text-white shadow-sm"
                                    : "text-gray-600 hover:text-black hover:bg-gray-200"
                                }`}
                        >
                            <span className="text-base">{<item.icon />}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <div className="flex items-center justify-end gap-4 w-fit mx-auto">
                        <button className="text-gray-600 hover:text-black">
                            <FiBell size={18} />
                        </button>
                        <button className="text-gray-600 hover:text-black">
                            <FiMessageSquare size={18} />
                        </button>
                        <div className="rounded-full flex items-center gap-2 bg-[#EFF1F6] pl-[5px] py-1 pr-2.5">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full  text-xs font-semibold">
                                <Avatar className="w-8 h-8 rounded-full bg-gradient-to-b from-gray-700 to-black text-white">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="bg-gradient-to-b from-gray-700 to-black text-white">
                                        {currentUser?.first_name?.[0] && currentUser?.last_name?.[0]
                                            ? currentUser.first_name[0] + currentUser.last_name[0]
                                            : ""}{" "}
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            <button
                                className="text-gray-600 hover:text-black"
                            >
                                <FiMenu size={20} />
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar