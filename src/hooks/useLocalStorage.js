import React, { useState } from 'react';


export const useLocalStorage = (key, value) => {
    const [storedValue, setStoredValue] = useState(() => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : value;
    })
    const setValue = value => {
        // Save state
        setStoredValue(value);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(value));
      };


    return [storedValue, setValue]
}