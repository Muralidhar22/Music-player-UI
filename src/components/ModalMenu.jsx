import { useState } from "react";

import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";
import Search from "./Search";
import Songs from "./Songs";
import Tabs from "./Tabs";
import { useTabContext } from "../context/tabContext";

const ModalMenu = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { tabIndex } = useTabContext()
    
    if(!isModalOpen) {
        return (
            <>
                <div onClick={() => setIsModalOpen(prev => !prev)} className="bg-white p-2 rounded-full grid place-content-center text-black">
                    <RxHamburgerMenu />
                </div>
            </>
        )
    }
    
    return (
          <div className={`absolute top-0 left-0 right-0 z-50 p-2 md:left-40 min-h-screen bg-gradient-to-br from-green-900 to-blue-900`}>
            <div className="flex gap-2 items-center">
                <div className="w-7 font-semibold h-7 bg-white p-2 text-black rounded-full grid place-content-center" onClick={() => setIsModalOpen(prev => !prev)}>
                    <MdOutlineClose />
                </div>
                <Search />
            </div>
            <div>
                <Tabs />
            </div>
            <div>
            {tabIndex?.value && <Songs playlistId={tabIndex?.value} />}
            </div>
          </div>  
    )
}

export default ModalMenu;