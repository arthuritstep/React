import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const savedValue = localStorage.getItem(key);

      if (savedValue !== null) {
        return JSON.parse(savedValue) as T;
      }

      return initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Не удалось сохранить данные:", error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
