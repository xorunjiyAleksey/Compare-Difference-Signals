import styled from "styled-components";

export const ButtonWrapper = styled.button`
  width: 80%;
  height: 20%;
  background-color: ${props => props.theme.buttonColor};
  :hover {
    background-color: ${props => props.theme.buttonHoverColor};
    cursor: pointer;
`;
ButtonWrapper.text = styled.span`
  color: ${props => props.theme.textColor};
  text-align: center;
  font-size: 18px;
`;
