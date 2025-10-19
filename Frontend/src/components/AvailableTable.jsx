//contributor: gurpreet
//component for the available classes/events tables in the timetable page 
import styled from "styled-components";

const TableWrapper = styled.div`
  margin-top: 1rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
  border: 1px solid #ccc; /* ensures grid lines show */
`;

const StyledTh = styled.th`
  border: 1px solid #ccc;
  padding: 4px;
  text-align: left;
  background-color: #f0f0f0;
`;

const StyledTd = styled.td`
  border: 1px solid #ccc;
  padding: 4px;
`;

const TableButton = styled.button`
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#e74c3c" : "#000")};
  color: #fff;
  font-weight: 500;

  &:hover {
    background-color: ${(props) => (props.selected ? "#c0392b" : "#333")};
  }
`;

const TableTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const EmptyMessage = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  background: #fafafa;
  color: #777;
  margin-bottom: 1.5rem;
`;

export default function AvailableTable({
    title,
    columns,
    data,
    renderRow,
    onToggle,
    isSelected,
}) {
    
    const lower = title.toLowerCase();
    const emptyText =
        lower.includes("class")
            ? "You are not enrolled in any classes! Enrol via myStudentAdmin."
            : "You are not a member of any clubs! Join through the \"Clubs\" tab.";

    return (
        <TableWrapper>
            <TableTitle>{title}</TableTitle>

            {data && data.length > 0 ? (
                <StyledTable>
                    <thead>
                        <tr>
                            {columns.map((col, idx) => (
                                <StyledTh key={idx}>{col}</StyledTh>
                            ))}
                            <StyledTh></StyledTh>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.classId || item.eventId}>
                                {renderRow(item).map((cell, i) => (
                                    <StyledTd key={i}>{cell}</StyledTd>
                                ))}
                                <StyledTd>
                                    <TableButton
                                        selected={isSelected(item)}
                                        onClick={() => onToggle(item)}
                                    >
                                        {isSelected(item) ? "Remove" : "Add"}
                                    </TableButton>
                                </StyledTd>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            ) : (
                <EmptyMessage>{emptyText}</EmptyMessage>
            )}
        </TableWrapper>
    );
}
