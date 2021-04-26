import styled from "styled-components";

export const Wrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
`;
export const WrapperContainer = styled.div`
  width: 60%;
  flex-wrap: wrap;
  align-content: space-between;
`;

export const LabelDiv = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
    background-color: ${props => props.theme.pagebackcolor};
    color: ${props => props.theme.textColor};
`;

export const InputWrapper = styled.div`
    width: 100%;
`;
InputWrapper.input = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 2%;
`;
InputWrapper.button = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 2%;
`;

export const ResponseStatus = styled.div`
  background-color: grey;
  width: 50px;
  height: 25px;
  border-radius: 8px;
`;

export const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column; 
`;
export const StatusWrapper = styled.div`
  display: flex;
`;


export const ButtonWrapper = styled.div`
  width: 35%;
  padding-top: 3%;
`;

