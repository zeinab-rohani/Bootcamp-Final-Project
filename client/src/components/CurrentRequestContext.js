import { createContext, useContext, useState } from "react";

export const CurrentRequestContext = createContext();

const CurrentRequestProvider = ({ children }) => {
    const [service, setService] = useState(null);
    const [services, setServices] = useState([]);
    const [user, setUser] = useState(null);
    const [client, setClient] = useState(null);
    const [clients, setClients] = useState([]);
    const [serviceProvider, setServiceProvider] = useState(null);
    const [serviceProviders, setServiceProviders] = useState([]);

    return (
        <CurrentRequestContext.Provider
        value={{
            service, setService,
            services, setServices,
            user,setUser,
            client, setClient,
            clients, setClients,
            serviceProvider, setServiceProvider,
            serviceProviders, setServiceProviders
        }}
        >
        {children}
        </CurrentRequestContext.Provider>
    );
};

export default CurrentRequestProvider;