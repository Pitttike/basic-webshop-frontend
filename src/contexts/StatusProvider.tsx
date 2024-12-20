import { createContext, useContext, useState } from "react";


interface statusContextType {
    status: string | null,
    setStatus: (status: string | null) => void
}

const statusContext = createContext<statusContextType | undefined>(undefined)
export function StatusProvider({ children }: { children: React.ReactNode }) {
    const [status, setStatus] = useState<string | null>(null)
    const value = {
        status, 
        setStatus
    }
    return (
        <statusContext.Provider value={value}>
            {children}
        </statusContext.Provider>
    )
}

export function useStatus() {
    const context = useContext(statusContext)
    if (context ===  undefined) {
        throw new Error('useStatus must be used within a UserProvider')
    }
    return context;
}

