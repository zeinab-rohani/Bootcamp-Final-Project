import styled from "styled-components";
import { useContext } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";
import Map from "./Map";

const Services = () => {

    const {address, setAddress,
        firstName, setFirstName,
        lastName, setLastName,
        email, setEmail,
        description, setDescription, serviceProvider} = useContext(CurrentRequestContext);

    return(
        <>
        <div>{serviceProvider}</div>
        <Map />
        </>
    )
}

export default Services;