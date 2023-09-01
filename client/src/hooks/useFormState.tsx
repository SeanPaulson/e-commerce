import { useState, useCallback } from 'react';

export const useFormState = <T,>(initial: T): [T, (name: keyof T) => void] => {
    const [formState, setRealFormState] = useState(initial);
    const setFormState = useCallback(
      (name: keyof T) => {
        setRealFormState(prev => ({...prev, [name]: true}));
      },
      []
    );
    return [formState, setFormState];
  };