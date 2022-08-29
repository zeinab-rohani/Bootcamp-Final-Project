import styled from "styled-components";

export const ThankyouMessage = () =>{

    return(
        <>
            <Section>
                <Div></Div>
            </Section>
            <Section>
                <TextDiv>Thank you for your request, it is being processed!</TextDiv>
            </Section>
        </>
    )
}

const Section = styled.div`
padding-top : 100px;
padding-left : 100px;
`;

const Div = styled.div`
position: relative;
display: inline-block;
width: 150px;
height: 120px;

::before {
    position: absolute;
    left: 0;
    top: 50%;
    height: 50%;
    width: 10px;
    background-color: green;
    content: "";
    transform: translateX(10px) rotate(-45deg);
    transform-origin: left bottom;
    }

::after {
    position: absolute;
    left: 0;
    bottom: 0;
    height:10px;
    width: 100%;
    background-color: green;
    content: "";
    transform: translateX(10px) rotate(-45deg);
    transform-origin: left bottom;
}
`;

const TextDiv = styled.div`
font-family: Arial, sans-serif;
font-size:3em;
letter-spacing:3px;
color:black ;
margin-top:70px;
`;


