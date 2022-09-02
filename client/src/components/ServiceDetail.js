import styled from "styled-components";
import { useContext, useState } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";


const ServiceDetail = () => {
    const {service, client, serviceProvider} = useContext(CurrentRequestContext)
    const [suggestion, setSuggestion] = useState("");

const confirmHandle = () => {
}
    return (
        <>
        <ClientSection>
            <Div> Category: {service.category}</Div>
            <Div> Title: {service.title}</Div>
            <Div> Description: {service.description}</Div>
            <section>
            <button type="confirm" value="confirm"
                onClick={confirmHandle}
            >
            confirm 
            </button>
            </section>
        </ClientSection>
        <ServiceProviderSection>
            <Div> Category: {service.category}</Div>
            <Div> Title: {service.title}</Div>
            <Div> Description: {service.description}</Div>
            <Label> Your suggestion for client:
           <UserInput type="text" placeholder="  suggestion" value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)} />
            </Label>
          <button type="confirm" value="confirm"
                onClick={confirmHandle}
            >
            confirm 
             </button>
        </ServiceProviderSection>
        </>

    )
}

export default ServiceDetail;

const Div = styled.div`
display: inline-block;
padding: 5px;
height: 50px;
width: 250px;
border: 3px solid gray;
`;

const ClientSection = styled.section``;

const ServiceProviderSection = styled.section``;

const Label = styled.label`
color: black;
font-size : large;
height: 50px;
width : 70px;
`;

const UserInput = styled.input`
height: 40px;
width : 350px;
border: 2px solid lightgray;
margin-left: 10px;
margin-right: 50px;
margin-top: 15px;
margin-bottom: 15px;
`;