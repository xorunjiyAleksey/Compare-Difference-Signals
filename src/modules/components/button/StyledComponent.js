import styled from 'styled-components';

export const ButtonWrapper = styled.button`
  width: 100%;
  height: 100%;
  outline: none;
  background-color: ${props => props.theme.buttonColor};

  :hover {
    background-color: ${props => props.theme.buttonHoverColor};
    cursor: pointer;
  }
`;
ButtonWrapper.text = styled.span`
  color: ${props => props.theme.textColor};
  text-align: center;
  font-size: 18px;
`;

export const LabelContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
LabelContainer.label = styled.span`
  color: ${props => props.theme.textColor};
  text-align: center;
  font-size: 18px;
  padding: 5px;
`;