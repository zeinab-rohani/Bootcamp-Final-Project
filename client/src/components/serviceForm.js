import styled from "styled-components";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentRequestContext } from "./CurrentRequestContext";
import { ThankyouMessage } from "./ThankYou";

const ServiceForm = () => {
    const [requestFinalized, setRequestFinalized] = useState(false);
    const {address, setAddress, firstName, setFirstName,
        lastName, setLastName, email, setEmail, phone, setPhone,
        description, setDescription, serviceCategory, setServiceCategory,
        service, setService,
        services, setServices, currentUser, setCurrentUser}
        = useContext(CurrentRequestContext);
        
    // const navigateServices = useNavigate()

const submitHandle = (event) => {
    // event.preventDefault();
    setRequestFinalized(true);

    fetch("/api/add-service", {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        userFirstname: firstName,
        userLastname: lastName,
        userEmail: email,
        userPhone: phone,
        userAddress: address,
        description: description,
        // serviceCategory: serviceCategory
    }),
    }).then((res) => {
    return res.json();
    });

    // navigateServices("/services")
}

    return(
        <>
    <Wrapper>
    {!requestFinalized ? (
    <form>
    <Label>
        First name:
    <UserInput
        type="text"
        placeholder="  first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
    />
    </Label>
    <Label>
        Last name:
    <UserInput
        type="text"
        placeholder="  last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
    />
    </Label>
    <Label>
        email:
    <UserInput
        type="text"
        placeholder="  email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    />
    </Label>
    <Label>
        Phone number:
    <UserInput
        type="text"
        placeholder="  phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
    />
    </Label>
    <Label>
        address:
    <UserInput
        type="text"
        placeholder="  address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
    />
    </Label>
    <Label>
        Please give us any details or description about your problem:
    <UserInput
        type="text"
        placeholder="  description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
    />
        </Label>
        
    <Label>service:</Label>
    <select name="services" value={serviceCategory}
    onSelect={(e) => setServiceCategory(e.target.value)}>
            <option value="Plumbing">Plumbing</option>
            <option value="heating">Heating</option>
            <option value="painting">Painting</option>
    </select>

    <SubmitButton
        type="submit"
        value="Submit"
        onClick={(event) => {
            submitHandle();
            // disabled={isdisabled}
        }}
        >
        Submit 
    </SubmitButton>
    </form>)
    // : <ThankyouMessage />}
    :(
        <>
        <div>Thank you</div>
       
        </>

    )}
    </Wrapper> 
        </>
    )
}

export default ServiceForm;


const Wrapper = styled.div`
padding : 20px;
`;


const Label = styled.label`
color: black;
font-size : large;
height: 50px;
width : 70px;
`;

const UserInput = styled.input`
height: 40px;
width : 320px;
border: 2px solid lightgray;
margin-left: 10px;
margin-right: 50px;
margin-top: 15px;
margin-bottom: 15px;
`;

const SubmitButton = styled.button`
font-family: Arial, sans-serif;
background-color: blue;
padding: 0.75rem 1.5rem;
background: #97b6de 0% 0% no-repeat padding-box;
color: #fff;
border-radius: 10px;
font-size: 1.2rem;
font-weight: 400;
border: 0px;
box-shadow: 0px 3px 10px #e5e8f5;
letter-spacing: 0.1rem;

&:hover {
background-color: lightblue;
}
`;

