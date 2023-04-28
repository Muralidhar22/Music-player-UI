import { createContext, useContext, useState } from "react";

const TabContext = createContext({
    tabIndex: 1,
    setTabIndex: () => {}
})

export const TabProvider = ({children}) => {
    const [tabIndex, setTabIndex] = useState(1)
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
