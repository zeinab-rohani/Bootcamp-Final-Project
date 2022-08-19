import styled from "styled-components";
import CurrentBookingContext from "./CurrentBookingContext";
import { useContext } from "react";

const Header = () => {
    return (
        <Wrapper>
            Home Aide
        </Wrapper>
    );
};

export default Header;

const Wrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;

`;

