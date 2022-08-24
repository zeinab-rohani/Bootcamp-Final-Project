import { createContext, useState } from "react";

const CurrentBookingContext = createContext();

const CurrentBookingProvider = ({ children }) => {
    const [currentBooking, setCurrentBooking] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentServiceProvider, setCurrentServiceProvider] = useState(null);

    
    return (
        <CurrentBookingContext.Provider
        value={{
            currentBooking,
            setCurrentBooking,
            currentUser,
            setCurrentUser,
            currentServiceProvider,
            setCurrentServiceProvider
        }}
        >
        {children}
        </CurrentBookingContext.Provider>
    );
};

export default CurrentBookingProvider;