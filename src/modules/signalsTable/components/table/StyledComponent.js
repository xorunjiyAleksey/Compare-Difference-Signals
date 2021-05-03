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
  font-size: 18px;
  text-align: center;
  padding-top: 5px;
  color: ${props => props.theme.textColor}
`;
TableColumn.column = styled.div`
  width: 150px;
  min-height: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.textColor};
`;

export const TableColumnContent = styled.div`
  width: auto;
  height: 50px;
  word-break: break-word;
  text-align: center;
  background-color: ${props => props.theme.tableBackground};
  cursor: pointer;
  border: 0.5px solid black;
`;