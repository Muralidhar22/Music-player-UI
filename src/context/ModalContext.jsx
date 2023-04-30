import { createContext, useContext, useState } from "react";

const ModalContext = createContext(undefined)

export const ModalProvider = ({children}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const value = {
        isModalOpen,
        setIsModalOpen
    }
    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export const useModalContext = () => {
    const context = useContext(ModalContext)
    if (context === undefined) {
        throw new Error('useModalContextContext must be used within a ModalProvider');
    }
    return context;
}