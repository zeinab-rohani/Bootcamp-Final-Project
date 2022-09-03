import { createContext, useContext, useState } from "react";

export const CurrentRequestContext = createContext();

const CurrentRequestProvider = ({ children }) => {
    const [service, setService] = useState(null);
    const [services, setServices] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [client, setClient] = useState(null);
    const [serviceProvider, setServiceProvider] = useState(null);
    const [serviceProviders, setServiceProviders] = useState([]);

    return (
        <CurrentRequestContext.Provider
        value={{
            service, setService,
            services, setServices,
            currentUser,setCurrentUser,
            client, setClient,
            serviceProvider, setServiceProvider,
            serviceProviders, setServiceProviders
        }}
        >
        {children}
        </CurrentRequestContext.Provider>
    );
};

export default CurrentRequestProvider;