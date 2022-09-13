import styled from "styled-components";
import { useContext, useState } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";

const ServiceForm = () => {
    const{user, client, setClient, clients, setClients} = useContext(CurrentRequestContext);
    
    const [phone, setPhone] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [serviceCategory, setServiceCategory] = useState("");
    const [address, setAddress] = useState("")
    const [isDisabled, setIsDisabled] = useState(false);
    const [requestFinalized, setRequestFinalized] = useState(false);
    const [message, setMessage] = useState("");

console.log("user", user)
console.log("category", serviceCategory)

    const submitHandle = (event) => {
        event.preventDefault();
        if (
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
            userEmail: user.email,
            phone: phone,
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
                        userName: user.name,
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
            <>
            <P>Please select the service you need and provide your informations</P>
            <Form>
            <LabelDiv>Service:</LabelDiv>
            <Select name="services" value={serviceCategory}
            onChange={(e) => setServiceCategory(e.target.value)}>
                <option value=""></option>
                <option value="Plumbing">Plumbing</option>
                <option value="Heating/Cooling">Heating/Cooling</option>
                <option value="Appliances">Appliances</option>
                <option value="Painting">Painting</option>

            </Select>   
            <LabelDiv >Tiltle:</LabelDiv>
            <UserInput1 type="text" placeholder="  title" value={title}
                onChange={(e) => setTitle(e.target.value)} />
            <section>
            <LabelDiv> Phone number: </LabelDiv>
            <UserInput1 type="text" placeholder="  phone" value={phone}
                onChange={(e) => setPhone(e.target.value)} />
            </section>
            <section>
            <LabelDiv> Address:</LabelDiv>
            <UserInput2  type="text"  placeholder="  address" value={address}
                onChange={(e) => setAddress(e.target.value)} />
            </section>
            <section>
            <LabelDiv> Description:</LabelDiv>
            <UserInput2 type="text" placeholder="  Please provide a detailed description of your problem" value={description}
                onChange={(e) => setDescription(e.target.value)} />
            
            </section>
            {message !== "" && <Message>{message}</Message>}
            <section style={{paddingLeft: "20px", paddingTop: "20px"}}>
            <SubmitButton type="submit" value="Submit"
                onClick={submitHandle}
                isDisabled={isDisabled} >
            Submit 
            </SubmitButton>
            </section>
            </Form>
            </>)
            :(
                <TextDiv>Thank you for your request, it is being processed!</TextDiv>)}
        </Wrapper> 
        </>
    )
}

export default ServiceForm;

const Wrapper = styled.div`
background-color: #FFEBCD;
height: 1000px;
padding : 20px;
`;

const P = styled.p`
padding-top: 30px;
padding-left: 50px;
font-size : 28px;
font-weight: bold;
`;

const Form = styled.form`
padding-top: 30px;
padding-left: 50px;
`;

const LabelDiv = styled.div`
font-size: 20px;
font-weight: bold;
`;

const Label = styled.label`
color: black;
font-size : large;
padding-left: 100px;
padding-right: 10px;
`;

const UserInput1 = styled.input`
height: 40px;
width : 350px;
border: 3px solid #004B99;
margin-bottom: 15px;
background-color: #FFF8DC;
`;

const UserInput2 = styled(UserInput1)`
width: 700px;
`;

const SubmitButton = styled.button`
font-family: Arial, sans-serif;
padding: 0.75rem 1.5rem;
background: #004B99 0% 0% no-repeat padding-box;
color: #fff;
border-radius: 5px;
font-size: 1.3rem;
font-weight: 400;
border: 0px;
box-shadow: 0px 3px 10px darkblue;
letter-spacing: 0.1rem;

&:hover {
background-color: lightblue;
}
`;

const Select = styled.select`
height: 40px;
width: 300px;
font-size: large;
background-color: #FFF8DC;
border: 3px solid #004B99;
margin-bottom: 15px;
`;

const Message = styled.div`
color: red;
margin-bottom: 15px;
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