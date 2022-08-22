import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import CurrentBookingContext from "./CurrentBookingContext";

const Header = () => {
    return (
        <Wrapper>
            <Link to="/" >
            <Logo>
                <h1>My logo</h1>
                <SigninSection>
                    {/* Manage your booking as: */}
                    <label>Sign in as:</label>
                    <select name="users" >
                        <option value="Client">Client</option>
                        <option value="Company">Company</option>
                    </select>
                </SigninSection>
            </Logo>
            </Link>
        </Wrapper>
    );
};

export default Header;

const Wrapper = styled.header`
display: flex;
justify-content: space-between;
background-color: #2e8b57;
height: 90px;
padding: px;
`;

const Logo = styled.div`
padding : 30px;
height: 80px;
width: 100%;
`;

const SigninSection = styled.div`
margin-left : 1000px;
`;