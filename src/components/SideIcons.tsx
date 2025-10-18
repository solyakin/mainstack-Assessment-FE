import { sidebardIcon1, sidebardIcon2, sidebardIcon3, sidebardIcon4 } from "../constant/media"

const SideIcons = () => {
    return (
        <div className="hidden md:flex fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
            <div className="flex flex-col items-center gap-6 p-3 rounded-full bg-white backdrop-blur-sm shadow-xl">
                <img src={sidebardIcon4} alt="icon 4" className="w-7 h-7 object-contain filter grayscale brightness-75 opacity-70 mix-blend-multiply" />
                <img src={sidebardIcon3} alt="icon 3" className="w-7 h-7 object-contain filter grayscale brightness-75 opacity-70 mix-blend-multiply" />
                <img src={sidebardIcon2} alt="icon 2" className="w-7 h-7 object-contain filter grayscale brightness-75 opacity-70 mix-blend-multiply" />
                <img src={sidebardIcon1} alt="icon 1" className="w-7 h-7 object-contain filter grayscale brightness-75 opacity-70 mix-blend-multiply" />
            </div>
        </div>
    )
}

export default SideIcons