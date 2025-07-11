import { useEffect, useState } from "react";

export const useDebounce = ({
  searchTerm,
  delay,
}: {
  searchTerm: string;
  delay: number;
}) => {
  const [debounceVaue, setDebounceValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(searchTerm);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm, delay]);

  return [debounceVaue];
};
