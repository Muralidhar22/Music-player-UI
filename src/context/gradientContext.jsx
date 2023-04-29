import { createContext, useContext, useState } from "react";

const GradientContext = createContext(undefined)

export const GradientProvider = ({children}) => {
    const [gradient, setGradient] = useState("black")

    const value = {
        gradient,
        setGradient
    }
    return <GradientContext.Provider value={value}>{children}</GradientContext.Provider>
}

export const useGradientContext = () => {
    const context = useContext(GradientContext)
    if (context === undefined) {
        throw new Error('useGradientContext must be used within a GradientProvider');
    }
    return context;
}