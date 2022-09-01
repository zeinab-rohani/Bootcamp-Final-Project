import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";


const ServiceDetail = () => {
    const {service, setService,
        services, setServices} = useContext(CurrentRequestContext)
    return (
        <>
        <div>{service.userAddress}</div>
                    <div>{service.category}</div>
                    <div>{service.description}</div>
        </>
    )
}

export default ServiceDetail;