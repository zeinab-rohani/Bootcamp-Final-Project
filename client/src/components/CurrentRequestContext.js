import { createContext, useContext, useState } from "react";

export const CurrentRequestContext = createContext();

const CurrentRequestProvider = ({ children }) => {
    const [service, setService] = useState([{}]);
    const [services, setServices] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [serviceProvider, setServiceProvider] = useState([]);
    const [address, setAddress] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [serviceCategory, setServiceCategory] = useState(null);
    const [description, setDescription] = useState(null);
    const [serviceProviders, setServiceProviders] = useState([]);
    const [phone, setPhone] = useState(null);

    return (
        <CurrentRequestContext.Provider
        value={{
            service, setService,
            services, setServices,
            currentUser,setCurrentUser,
            serviceProvider, setServiceProvider,
            serviceProviders, setServiceProviders,
            phone, setPhone,
            address, setAddress,
            firstName, setFirstName,
            lastName, setLastName,
            email, setEmail,
            description, setDescription,
            serviceCategory, setServiceCategory
        }}
        >
        {children}
        </CurrentRequestContext.Provider>
    );
};

export default CurrentRequestProvider;