import { CircularProgress } from "@mui/material";
import styled from "styled-components";

export const Loading = () => {
  return (
    <LoadingStyle>
      <div>
        <CircularProgress></CircularProgress>
      </div>
    </LoadingStyle>
  );
};

const LoadingStyle = styled.div`
  height: 20vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 5rem;
`;

const LoadingContainer = <style></style>;
