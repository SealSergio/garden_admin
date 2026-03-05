import { useEffect, useRef, useState } from "react";

export function useSelect<T extends HTMLElement>() {
        const [isOpen, setIsOpen] = useState<boolean>(false);

        const selectRef = useRef<T>(null);

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (selectRef.current && !selectRef.current.contains(event.target as HTMLElement)) {
                    setIsOpen(false);
                }
            };
            if (isOpen) {
                document.addEventListener("mousedown", handleClickOutside);
            }
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [isOpen]);

        const handleToggle = () => {
            setIsOpen(!isOpen);
        };

        const openSelect = () => {
            if (!isOpen) setIsOpen(true);
        }

        const handleInnerClick = () => {
            setIsOpen(false);
        };

        return {selectRef, handleToggle, openSelect, handleInnerClick, isOpen};
    }