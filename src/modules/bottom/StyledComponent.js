import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 50%;
  background-color: greenyellow;
`;

export const TableModul = styled.div`
  width: 90%;
  height: 50%;
`;

export const Table = styled.div`
  width: 75%;
  height: 100%;
`;
export const TableHeaders = styled.div`
  width: 100%;
  height: 10%;
`;

export const TableHeader = styled.div`
  width: 25%;
  height: 100%;
`;
TableHeader.text = styled.span``;

export const TableDisplays = styled.div`
  width: 100%;
  height: 100%;
`;
export const TableDisplay = styled.div`
  width: 25%;
  height: 100%;
`;

export const CompareButtons = styled.div`
  width: 25%;
  height: 100%;
`;
export const Button = styled.button`
  width: 80%;
  height: 25%;
`;
Button.text = styled.span``;


Wrapper.TableModul = TableModul;
TableModul.Table = Table;
Table.TableHeaders = TableHeaders;
TableHeaders.TableHeader = TableHeader;
Table.CompareButtons = CompareButtons;
CompareButtons.Button = Button;