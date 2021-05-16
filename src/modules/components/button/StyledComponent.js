import styled from 'styled-components';

export const ButtonWrapper = styled.button`
  width: 100%;
  height: 100%;
  outline: none;
  background-color: ${props => props.theme.getSignalsBtnColor};
  padding: 5px;

  :hover {
    background-color: ${props => props.theme.pagebackcolor};
    cursor: pointer;
    border: 6px;
    border-color: #3B5FB9;
  }
`;
ButtonWrapper.text = styled.span`
  width: 100%;
  height: 100%;
  color: ${props => props.theme.textColor};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 17px;
  
  :hover {
    border: 4px solid ${props => props.theme.getSignalsBtnColor};
    color: ${props => props.theme.getSignalsBtnColor};
  }
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
  font-size: 21px;
  padding: 5px;
`;
