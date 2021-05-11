import styled from "styled-components";

export const Wrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
`;
export const WrapperContainer = styled.div`
  width: 60%;
  flex-direction: column;
  justify-content: space-between;
`;

export const LabelDiv = styled.div`
  height: 50px;
  display: flex;
  align-items: center;

`;

export const Label = styled.label`
    background-color: ${props => props.theme.pagebackcolor};
    color: ${props => props.theme.textColor};
    font-size: 21px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  height: 32%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

InputWrapper.input = styled.div`
  width: 100%;
  height: 30px;
`;

InputWrapper.button = styled.div`
  width: 100%;
  height: 30px;
`;

export const ResponseStatus = styled.div`
  background-color: green;
  width: 25px;
  height: 25px;
`;

export const ButtonDiv = styled.div`
  width: 100%;
  height: 32%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ButtonWrapper = styled.div`
  width: 27%;
`;

