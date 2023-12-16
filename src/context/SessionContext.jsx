import { useState, useContext, createContext } from 'react';

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    return (
        <SessionContext.Provider value={{ session, setSession }}>
        {children}
        </SessionContext.Provider>
    );
};

const useSession = () => useContext(SessionContext);

export { SessionProvider, useSession };