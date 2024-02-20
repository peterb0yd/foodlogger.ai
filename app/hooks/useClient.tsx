import { useEffect, useState } from "react";

export  const useClient = () => {
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        if (!isClient) {
            setIsClient(true);
            return;
        }
    }, [isClient]);

    return isClient;
}