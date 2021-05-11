import styled from "styled-components";

export const Wrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin-left: 35px;
`;
export const WrapperContainer = styled.div`
  width: 100%;
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
  width: 90%;
  height: 48%;
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
  width: 10%;
  height: 100%;
  border-radius: 10px;
`;

export const ButtonDiv = styled.div`
  width: 100%;
  height: 48%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ButtonWrapper = styled.div`
  width: 35%;
  margin-right: 70px;
`;

export const StatusWrapper = styled.div`
  width: 100%;
  height: 48%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;


