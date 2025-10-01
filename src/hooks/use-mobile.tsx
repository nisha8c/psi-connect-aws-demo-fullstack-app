import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        // SSR guard
        if (typeof window === "undefined") return;

        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        // set initial value
        onChange();

        // listen for changes
        mql.addEventListener("change", onChange);

        return () => mql.removeEventListener("change", onChange);
    }, []);

    return !!isMobile;
};
