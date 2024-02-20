import { useEffect, useState } from "react";
import { useClient } from "./useClient";

export const useMobileDevice = () => {
    const [isMobile, setIsMobile] = useState(false);
    const isClient = useClient();
    
    useEffect(() => {
        if (!isClient) return;
        
        const handleWindowSizeChange = () => {
            setIsMobile(window.innerWidth <= 768);
        }
        
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, [isClient]);

    return isMobile;
}