import { createContext, useContext, useState } from "react";

const TabContext = createContext({
    tabIndex: {value: 1, title: ""},
    setTabIndex: () => {}
})

export const TabProvider = ({children}) => {
    const [tabIndex, setTabIndex] = useState()
    const value = {
        tabIndex,
        setTabIndex
    }
    
    return <TabContext.Provider value={value} >{children}</TabContext.Provider>
}

export const useTabContext = () => {
    const context = useContext(TabContext);
    if (context === undefined) {
        throw new Error('useTabContext must be used within a TabProvider');
    }
  return context;
}
