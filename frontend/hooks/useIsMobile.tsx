import React, { useState, useContext, PropsWithChildren, useEffect } from 'react';

const IsMobileContext = React.createContext(false);

export const IsMobileProvider = ({ children }: PropsWithChildren) => {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <IsMobileContext.Provider value={isMobile}>
            {children}
        </IsMobileContext.Provider>
    );
} 

export const useIsMobile = () => useContext(IsMobileContext)