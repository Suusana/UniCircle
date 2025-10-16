import styled from "styled-components";
import { useEffect, useState } from "react";
import http from "../utils/http";
import { useAuth } from "../contexts/AuthContext";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 4px;
  color: #111827;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background: #fff;
  color: #111827;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background: #000;
    color: #fff;
  }
`;

export const ModalForm = ({ type, onClose, initialData = {}, id ,onSuccess = () => { } }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialData);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // when submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "editClub") {
        await http.post("/clubs/edit", formData);
      } else if (type === "createEvent") {
        const submitData = {
          studentId: user.studentId,
          clubId: id,
          title: formData.title,
          description: formData.description,
          location: formData.location,
          status: "Upcoming",
          startTime: formData.startTime,
          endTime: formData.endTime
        };

        await http.post("/events/createEvent", submitData, {
          headers: { "Content-Type": "application/json" }
        });
      } else {
        const submitData = {
          eventId: formData.eventId,
          title: formData.title,
          description: formData.description,
          location: formData.location,
          startTime: formData.startTime,
          endTime: formData.endTime,
          status: formData.status,
          clubId: id
        };
        await http.post("/events/editEvent", submitData, {
          headers: { "Content-Type": "application/json" }
        });
      }
      onClose();
      onSuccess();  // Call onSuccess callback if provided
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {type === "editClub" && (
        <>
          <Input type="hidden" name="id" value={id} />
          <FormGroup>
            <Label htmlFor="name">Club Name</Label>
            <Input
              name="name"
              placeholder="Club Name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description || ""}
              onChange={handleChange}
            />
          </FormGroup>
        </>
      )}
      {type === "createEvent" && (
        <>
          <Input type="hidden" name="id" value={id} />
          <FormGroup>
            <Label htmlFor="title">Event Title</Label>
            <Input
              name="title"
              placeholder="Event Title"
              value={formData.title || ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description || ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="location">Location</Label>
            <Input
              name="location"
              placeholder="location"
              value={formData.location || ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              type="date"
              name="startTime"
              placeholder="startTime"
              value={formData.startTime || ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="endTime">End Time</Label>
            <Input
              type="date"
              name="endTime"
              placeholder="endTime"
              value={formData.endTime || ""}
              onChange={handleChange}
            />
          </FormGroup>
        </>
      )}
      {type === "editEvent" && (
        <>
          <Input
            type="hidden"
            name="eventId"
            value={formData.eventId}
          />
          <FormGroup>
            <Label htmlFor="title">Event Title</Label>
            <Input
              name="title"
              placeholder="Event Title"
              value={formData.title || ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description || ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="location">Location</Label>
            <Input
              name="location"
              placeholder="location"
              value={formData.location || ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="status">Status</Label>
            <Select
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
          </FormGroup>
        </>
      )}
      <Button type="submit">Submit</Button>
    </Form>
  );
};
