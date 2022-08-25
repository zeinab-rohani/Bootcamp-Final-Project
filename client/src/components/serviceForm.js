import styled from "styled-components";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentRequestContext } from "./CurrentRequestContext";

const ServiceForm = () => {

    const {address, setAddress,
        firstName, setFirstName,
        lastName, setLastName,
        email, setEmail,
        description, setDescription} = useContext(CurrentRequestContext);

    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [address, setAddress] = useState("");
    // const [description, setDescription] = useState("");

    const navigateServices = useNavigate()

const submitHandle = (event) => {
    // event.preventDefault();

    fetch("/api/add-booking", {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        userFirstname: firstName,
        userLastname: lastName,
        userEmail: email,
        userAddress: address,
        description: description,
    }),
    }).then((res) => {
    return res.json();
    });

    navigateServices("/services")
}

    return(
        <>
    <Wrapper>
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
        {/* <label>location:</label>
        <select name="location" >
            <option value="Montreal">Montreal</option>
            <option value="Laval">Laval</option>
            <option value="Blaineville">Blaineville</option>
            <option value="Longueuil">Longueuil</option>
    </select>     */}
    <Label>service:</Label>
    <select name="services" >
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
    </form>
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