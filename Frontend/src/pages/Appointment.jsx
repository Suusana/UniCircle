import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Td = styled.td`
  padding: 10px;
  vertical-align: top;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color:rgb(0, 0, 0);
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background-color:rgb(101, 101, 101);
  }
`;

const Appointment = () => {
  return (
    <Container>
      <Title>Appointment</Title>
      <Table>
        <tbody>
          <tr>
            <Td><label>Date:</label></Td>
            <Td><Input type="date" /></Td>
          </tr>
          <tr>
            <Td><label>Time Slot:</label></Td>
            <Td>
              <Select>
                <option>8:00</option>
                <option>9:00</option>
                <option>10:00</option>
                <option>11:00</option>
                <option>12:00</option>
                <option>13:00</option>
                <option>14:00</option>
                <option>15:00</option>
                <option>16:00</option>
                <option>17:00</option>
                <option>18:00</option>
                <option>19:00</option>
                <option>20:00</option>
                <option>21:00</option>
                <option>22:00</option>
              </Select>
            </Td>
          </tr>
          <tr>
            <Td><label>Title:</label></Td>
            <Td><Input type="text" /></Td>
          </tr>
          <tr>
            <Td><label>Description:</label></Td>
            <Td><Textarea rows="4" /></Td>
          </tr>
        </tbody>
      </Table>
      <Button>Submit</Button>
    </Container>
  );
};

export default Appointment;
