// @/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue = null) => {
    const [storedValue, setStoredValue] = useState(initialValue);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            // Check if we're in the browser
            if (typeof window !== 'undefined') {
                const item = window.localStorage.getItem(key);
                if (item && item !== 'undefined') {
                    setStoredValue(JSON.parse(item));
                }
            }
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
        } finally {
            setIsLoading(false);
        }
    }, [key]);

    const setValue = (value) => {
        try {
            setStoredValue(value);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue, isLoading];
};