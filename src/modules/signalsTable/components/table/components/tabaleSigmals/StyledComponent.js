import styled from 'styled-components';

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