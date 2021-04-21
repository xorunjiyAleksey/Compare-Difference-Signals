import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: greenyellow;
  display: flex;
`;

export const TableModule = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
`;

export const Table = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
`;

export const TableColumn = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
TableColumn.title = styled.span`
  width: 100%;
  height: 10%;
  padding: 3px;
  font-size: 12px;
`;
TableColumn.column = styled.div`
  width: 100%;
  height: 90%;
`;

export const CompareButtons = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const Button = styled.button`
  width: 80%;
  height: 25%;
`;
Button.text = styled.span``;
