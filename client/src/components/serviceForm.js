import styled from "styled-components";
import { useContext, useState } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";

const ServiceForm = () => {
    const{user, client, setClient, clients, setClients} = useContext(CurrentRequestContext);
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [serviceCategory, setServiceCategory] = useState("");
    const [address, setAddress] = useState("")
    const [isDisabled, setIsDisabled] = useState(false);
    const [requestFinalized, setRequestFinalized] = useState(false);
    const [message, setMessage] = useState("");

    const submitHandle = (event) => {
        event.preventDefault();
        if (
        !firstName ||
        !lastName ||
        !title ||
        !address ||
        !phone ||
        !description ||
        !serviceCategory
        ) {
        setMessage("Some informations missing!");
        } else {
        setIsDisabled(false);
        setRequestFinalized(true);
        setClient(user);

        fetch("/api/add-service", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userFirstname: firstName,
            userLastname: lastName,
            userEmail: user.email,
            userPhone: phone,
            userAddress: address,
            title: title,
            description: description,
            serviceCategory: serviceCategory
        }),
        }).then((res) => {
        return res.json();
        });
        }
        console.log("client", client)
        const getClients = async () => {
            const res = await fetch("/api/clients");
            const { data } = await res.json();
            setClients(data);
            };
            getClients();

            if (!clients.includes(client))
            {
                fetch("/api/add-client", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userFirstname: firstName,
                        userLastname: lastName,
                        userEmail: user.email,
                        userPhone: phone,
                        userAddress: address,
                    }),
                    }).then((res) => {
                    return res.json();
                    });
            }
    }
    return(
        <>
        <Wrapper>
        {!requestFinalized ? (
            <form>
            <Label>service:</Label>
            <Select name="services" value={serviceCategory}
            onChange={(e) => setServiceCategory(e.target.value)}>
                <option value=""></option>
                <option value="Plumbing">Plumbing</option>
                <option value="heating">Heating</option>
                <option value="painting">Painting</option>
            </Select>   
            <Label> First name:
            <UserInput type="text" placeholder="  first name" value={firstName}
                onChange={(e) => setFirstName(e.target.value)} />
            </Label>
            <Label> Last name:
            <UserInput type="text" placeholder="  last name" value={lastName}
                onChange={(e) => setLastName(e.target.value)} />
            </Label>
            <Label> Title of the request:
            <UserInput type="text" placeholder="  title" value={title}
                onChange={(e) => setTitle(e.target.value)} />
            </Label>
            <Label> Phone number:
            <UserInput type="text" placeholder="  phone" value={phone}
                onChange={(e) => setPhone(e.target.value)} />
            </Label>
            <Label> address:
            <UserInput  type="text"  placeholder="  address" value={address}
                onChange={(e) => setAddress(e.target.value)} />
            </Label>
            <Label> Please provide a detailed description of your problem:
            <UserInput type="text" placeholder="  description" value={description}
                onChange={(e) => setDescription(e.target.value)} />
            </Label>
            {message !== "" && <Message>{message}</Message>}
            <SubmitButton type="submit" value="Submit"
                onClick={submitHandle}
                isDisabled={isDisabled} >
            Submit 
            </SubmitButton>
            </form>)
            :(
                <TextDiv>Thank you for your request, it is being processed!</TextDiv>)}
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
width : 350px;
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

const Select = styled.select`
height: 50px;
font-size: large;
`;

const Message = styled.div`
color: red;
margin-bottom: 30px;
font-size: large;
font-weight: bold;
`;

const TextDiv = styled.div`
font-family: Arial, sans-serif;
font-size:3em;
letter-spacing:3px;
color:black ;
margin-top:70px;
`;