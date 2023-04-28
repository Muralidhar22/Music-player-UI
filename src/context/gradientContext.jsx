import { createContext, useContext, useState } from "react";
import ColorThief from "colorthief";
import { arrayToRgb } from "../utils/arrayToRgb";

const colorThief = new ColorThief()

const GradientContext = createContext({
    gradientColor: "black",
    setGradientColor: () => {}
})

export const GradientProvider = ({children}) => {
    const [gradient, setGradient] = useState("black")
    
    const updateBgGradient = (imageUrl) => {
        const coverImg = new Image()
        coverImg.onload = function () { 
            const gradientColor = colorThief.getColor(coverImg) 
            setGradient(arrayToRgb(gradientColor))
        }
        coverImg.src=imageUrl
        coverImg.crossOrigin = 'Anonymous';
    }
    
    const value = {
        gradient,
        setGradient, 
        updateBgGradient
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