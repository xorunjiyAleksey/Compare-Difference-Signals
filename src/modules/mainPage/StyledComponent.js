import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
`;
export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.pagebackcolor};
`;
Wrapper.Top = styled.div`
  width: 100%;
  height: 50vh;
`;

Wrapper.Bottom = styled.div`
  width: 100%;
  height: 50vh;
`;