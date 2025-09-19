import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import http from "../utils/http";

const PageContainer = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  overflow: hidden;
  font-family: Arial, sans-serif;
`;

const HistoryContainer = styled.div`
  width: 400px;
  border-right: 1px solid #ddd;
  padding: 30px;
  background: #f9f9f9;
  height: 100%;
  overflow-y: auto;
`;

const HistoryItem = styled.div`
  padding: 24px;
  margin-bottom: 24px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const StatusTag = styled.span`
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: bold;
  float: right;
  background: #cce0ff
`;

const CheckInButton = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 16px;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;

  &:hover {
    background: #555;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  padding: 40px;
  background: #fdfdfd;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Title = styled.h2`
  color: #111;
  margin-bottom: 30px;
  font-size: 28px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  color: #333;
  margin-bottom: 6px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #111;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  resize: none;

  &:focus {
    border-color: #111;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;

  &:focus {
    border-color: #111;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: #111;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #555;
  }
`;

const HistoryTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #111;
`;

const Appointment = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState();
  const [isConfirm, setIsConform] = useState({}); // check in or cancel the appointment

  //get the history appointment record
  const getHistoryAppointments = async () => {
    try {
      const res = await http.get("/appointments/getAll", { params: { studentId: user.studentId } })
      console.log(res.data)
      setAppointments(res.data)
    } catch (error) {
      console.log("Fail to get all appointments:", error)
    }
  }

  //when loading data
  useEffect(() => {
    getHistoryAppointments();
  }, [])

  //check in the appointment
  const CheckIn = async (id) => {
    const confirm = window.confirm("Are you sure to check in this appointment?")
    if (confirm) {
      await http.put("/appointments/checkIn", null, { params: { appointmentId: id } })
      setAppointments((pre) => (
        pre.map((a) => (
          a.appointmentId == id ? { ...a, status: "Completed" } : a //change the status of appointment
        ))
      ))
      setIsConform((pre) => (
        { ...pre, [id]: true }
      ));
    }
  }

  //cancel an appointment
  const cancelAppointment = async (id) => {
    const confirm = window.confirm("Are you sure to cancel this appointment?")
    if (confirm) {
      await http.delete("/appointments/cancel", { params: { appointmentId: id } })
      setAppointments((pre) => (
        pre.map((a) => (
          a.appointmentId == id ? { ...a, status: "Cancelled" } : a
        ))
      ))
    }
    setIsConform((pre) => (
      { ...pre, [id]: true }
    ))
  }

  return (
    <PageContainer>
      <HistoryContainer>
        <HistoryTitle>History Appointment Record</HistoryTitle>
        {appointments ? appointments.map(a => (
          <HistoryItem key={a.appointmentId}>
            <strong>{a.title}</strong>
            <StatusTag>{a.status}</StatusTag>
            <p>{a.description}</p>
            <p>📅 {a.date}</p>
            <p>⏰ {a.timeSlot}</p>
            {/* When the status is booked, then buttons will show up */}
            {a.status == "Booked" &&
              <>
                {!isConfirm[a.appointmentId] && <CheckInButton onClick={() => CheckIn(a.appointmentId)}>Check In</CheckInButton>}
                {!isConfirm[a.appointmentId] && <CheckInButton onClick={() => cancelAppointment(a.appointmentId)}>Cancel</CheckInButton>}
              </>
            }
          </HistoryItem>
        )) : <HistoryItem>There is no history appointment records</HistoryItem>
        }
      </HistoryContainer>

      <FormContainer>
        <Title>Schedule a New Appointment</Title>
        <form>
          <Label>Title</Label>
          <Input type="text" placeholder="Enter appointment title" />

          <Label>Details</Label>
          <Textarea rows={4} placeholder="Enter details..." />

          <Label>Date</Label>
          <Input type="date" />

          <Label>Time</Label>
          <Select>
            <option value="10:00-11:00">10:00-11:00</option>
            <option value="11:00-12:00">11:00-12:00</option>
            <option value="12:00-13:00">12:00-13:00</option>
            <option value="13:00-14:00">13:00-14:00</option>
            <option value="14:00-15:00">14:00-15:00</option>
            <option value="15:00-16:00">15:00-16:00</option>
            <option value="16:00-17:00">16:00-17:00</option>
            <option value="17:00-18:00">17:00-18:00</option>
            <option value="18:00-19:00">18:00-19:00</option>
            <option value="19:00-20:00">19:00-20:00</option>
          </Select>

          <Button>Submit</Button>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default Appointment;
