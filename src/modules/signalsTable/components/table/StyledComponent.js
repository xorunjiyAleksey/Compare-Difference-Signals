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
  height: auto;
  font-size: 21px;
  text-align: center;
  padding: 7px;
  color: ${props => props.theme.textColor}
`;
TableColumn.column = styled.div`
  width: 70%;
  height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.textColor};
`;

export const TableColumnContent = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0.5px solid black;
`;

TableColumnContent.content = styled.div`
  width: auto;
  height: auto;
  cursor: pointer;
  background-color: ${props => props.theme.tableBackground};
`;