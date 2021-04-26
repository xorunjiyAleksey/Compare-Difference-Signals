import styled from "styled-components";

export const TableColumn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.tableBackground};
`;
TableColumn.title = styled.span`
  width: 90%;
  height: 10%;
  font-size: 18px;
  text-align: center;
  padding-top: 5px;
  color: ${props => props.theme.textColor}
`;
TableColumn.column = styled.div`
  width: 90%;
  height: 80%;
  background-color: ${props => props.theme.textColor};
`;