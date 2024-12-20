
import { useState, useEffect } from 'react';
import { ApiStatus } from '../types';

export function useStatusMessage(timeout = 4900) {
    const [error, setError] = useState<ApiStatus | null>(null);
    const [success, setSuccess] = useState<ApiStatus | null>(null);

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                if (error) setError(null);
                if (success) setSuccess(null);
            }, timeout);
            return () => clearTimeout(timer);
        }
    }, [error, success, timeout]);

    return {
        error,
        success,
        setError,
        setSuccess,
        clearStatus: () => {
            setError(null);
            setSuccess(null);
        }
    };
}