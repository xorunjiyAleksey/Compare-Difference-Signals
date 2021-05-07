import styled from "styled-components";

export const Wrapper = styled.div`
  width: ${props => props.theme.wrapperWidth};
  height: ${props => props.theme.wrapperHeight};
  background-color: ${props => props.theme.pagebackcolor};
  display: flex;
`;

export const TableModule = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  padding: 2%;
  justify-content: space-between;
`;

export const CompareButtonWrapper = styled.div`
  width: 23%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

CompareButtonWrapper.button = styled.div`
  height: 35px;
  margin-bottom: 10px;
  background-color: ${props => props.theme.buttonColor};
  
  :hover{
    background-color: ${props => props.theme.pagebackcolor}
  }
`;

export const TableWrapper = styled.div`
  width: 75%;
  height: auto;
  min-height: 350px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;