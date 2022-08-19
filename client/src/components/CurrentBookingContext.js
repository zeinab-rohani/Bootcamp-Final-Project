import { createContext, useState } from "react";

const CurrentBookingContext = createContext();

const CurrentBookingProvider = ({ children }) => {
    const [currentBooking, setCurrentBooking] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    
    return (
        <CurrentBookingContext.Provider
        value={{
            currentBooking,
            setCurrentBooking,
            currentUser,
            setCurrentUser,
        }}
        >
        {children}
        </CurrentBookingContext.Provider>
    );
};

export default CurrentBookingProvider;