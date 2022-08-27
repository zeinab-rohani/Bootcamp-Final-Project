import { createContext, useContext, useState } from "react";

export const CurrentRequestContext = createContext();

const CurrentRequestProvider = ({ children }) => {
    const [currentService, setCurrentService] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [serviceProvider, setServiceProvider] = useState(null);
    const [address, setAddress] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [description, setDescription] = useState(null);

    return (
        <CurrentRequestContext.Provider
        value={{
            currentService,
            setCurrentService,
            currentUser,
            setCurrentUser,
            serviceProvider, setServiceProvider,
            address, setAddress,
            firstName, setFirstName,
            lastName, setLastName,
            email, setEmail,
            description, setDescription
        }}
        >
        {children}
        </CurrentRequestContext.Provider>
    );
};

export default CurrentRequestProvider;