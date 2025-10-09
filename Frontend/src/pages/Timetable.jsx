import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const EditBtn = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 120px repeat(5, 1fr);
  border: 1px solid #ccc;
`;

const GridCell = styled.div`
  border: 1px solid #ccc;
  min-height: 50px;
  padding: 2px;
  position: relative;
`;

const HeaderCell = styled(GridCell)`
  background: #f0f0f0;
  font-weight: bold;
  text-align: center;
`;

const ItemBox = styled.div`
  background: #4a90e2;
  color: white;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.85rem;
  margin: 1px 0;
  position: absolute;
  width: calc(100% - 4px);
`;

const thStyle = {
  border: "1px solid #ccc",
  padding: "4px",
  textAlign: "left",
  background: "#f0f0f0",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "4px",
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TIME_SLOTS = Array.from({ length: 16 }, (_, i) => {
  const start = 6 + i;
  const end = start + 1;
  return `${start.toString().padStart(2, "0")}:00-${end.toString().padStart(2, "0")}:00`;
});


export default function Timetable() {
  const { user } = useAuth();
  const studentId = user?.studentId ?? user?.id;

  const [timetable, setTimetable] = useState(null);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [availableEvents, setAvailableEvents] = useState([]);
  const [dayMap, setDayMap] = useState({});
  const [editing, setEditing] = useState(false);

  const semester = "Semester 1";
  const year = 2025;


  const parseDate = (str) => {
    if (!str) return null;
    // handle "YYYY-MM-DD HH:mm:ss" or "YYYY-MM-DDTHH:mm:ss"
    const isoStr = str.includes("T") ? str : str.replace(" ", "T");
    const d = new Date(isoStr);
    return isNaN(d) ? null : d;
  };

  const formatTime = (str) => {
    const d = parseDate(str);
    return d ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--";
  };


useEffect(() => {
  if (!timetable?.items) return;

  setDayMap((prev) => {
    const updated = { ...prev };
    timetable.items.forEach((item) => {
      if (item.event && !updated[item.event.eventId]) {
        const index = item.event.eventId % DAYS.length;
        updated[item.event.eventId] = DAYS[index];
      }
    });
    return updated;
  });
}, [timetable]);


  useEffect(() => {
    if (!studentId) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`/timetable/student/${studentId}`);
        setTimetable(res.data);
      } catch (err) {
        setTimetable(null);
      }

      try {
        const classesRes = await axios.get(`/timetable/student/${studentId}/classes/available`);
        setAvailableClasses(classesRes.data);
      } catch (err) { console.error(err); }

      try {
        const eventsRes = await axios.get(`/timetable/student/${studentId}/events/available`);
        setAvailableEvents(eventsRes.data);
      } catch (err) { console.error(err); }

      try {
  const eventsRes = await axios.get(`/timetable/student/${studentId}/events/available`);
  const events = eventsRes.data;

  // Make sure every event gets a consistent deterministic day
  const updatedMap = { ...dayMap };
  events.forEach(ev => {
    if (!updatedMap[ev.eventId]) {
      const index = ev.eventId % DAYS.length;
      updatedMap[ev.eventId] = DAYS[index];
    }
  });
  setDayMap(updatedMap);
  setAvailableEvents(events);
} catch (err) { console.error(err); }

    };

    fetchData();
  }, [studentId]);

  const createTimetable = async () => {
    try {
      const res = await axios.post(`/timetable`, null, { params: { studentId, semester, year } });
      setTimetable(res.data);
    } catch (err) { console.error(err); }
  };

  const addItem = async (classId = null, eventId = null) => {
    console.log("Attempting to add item:", { classId, eventId });
    if (!timetable?.timetableId) return alert("Please create a timetable first!");
    try {
      const res = await axios.post(`/timetable/${timetable.timetableId}/items`, null, {
        params: { classId, eventId },
      });
      console.log("Item added successfully:", res.data);
      setTimetable({
        ...timetable,
        items: [...(timetable.items || []), res.data],
      });
    } catch (err) {
      console.error("Error adding item:", err.response?.data || err.message);
    }
  };


  const removeItem = async (itemId) => {
    try {
      await axios.delete(`/timetable/items/${itemId}`);
      setTimetable({
        ...timetable,
        items: timetable.items.filter((item) => item.itemId !== itemId),
      });
    } catch (err) { console.error(err); }
  };

  const parseTime = (timeStr) => {
    const [hour, minute] = timeStr.split(":").map(Number);
    return hour + minute / 60;
  };

  const isOverlapping = (slot, startTime, endTime) => {
    const [slotStart, slotEnd] = slot.split("-").map(parseTime);
    const start = parseDate(startTime);
    const end = parseDate(endTime);
    if (!start || !end) return false;
    const startHour = start.getHours() + start.getMinutes() / 60;
    const endHour = end.getHours() + end.getMinutes() / 60;
    return !(endHour <= slotStart || startHour >= slotEnd);
  };

  const getDurationHeight = (startStr, endStr) => {
    const start = parseDate(startStr);
    const end = parseDate(endStr);
    if (!start || !end) return 0;
    const diffHours = (end - start) / (1000 * 60 * 60);
    return diffHours * 50;
  };

  const getItemsForCell = (day, slot, slotIndex) => {
    if (!timetable?.items) return [];
    return timetable.items
      .map((item) => {
        let displayDay = null;
        let startStr = item.classEntity?.startTime || item.event?.startTime;
        let endStr = item.classEntity?.endTime || item.event?.endTime;
        const start = parseDate(startStr);
        const end = parseDate(endStr);

        if (!start || !end) return null;

        if (item.classEntity) {
          displayDay = item.classEntity.dayOfWeek;
          const startSlotIndex = start.getHours() - 6;
          if (slotIndex !== startSlotIndex) return null;
        } else if (item.event) {
          displayDay = dayMap[item.event.eventId];
          if (!displayDay) return null;
          const startSlotIndex = start.getHours() - 6;
          if (slotIndex !== startSlotIndex) return null;
        }

        return displayDay === day ? item : null;
      })
      .filter(Boolean);
  };

  if (!timetable) {
    return (
      <div>
        <p>No timetable found.</p>
        <button onClick={createTimetable}>Create Timetable</button>
      </div>
    );
  }

const getSubjectName = (classEntity) => {
  if (!classEntity) return "";
  return (
    classEntity.subject?.name ||
    availableClasses.find(c => c.classId === classEntity.classId)?.subject?.name ||
    `Class ${classEntity.classId}`
  );
};

const getClubName = (event) => {
  if (!event) return "";
  return (
    event.club?.name ||
    availableEvents.find(e => e.eventId === event.eventId)?.club?.name ||
    "No club"
  );
};




  return (
    <Container>
      <TopBar>
        <Title>My Timetable ({semester} {year})</Title>
        <EditBtn onClick={() => setEditing((e) => !e)}>
          {editing ? "Submit Timetable" : "Edit Timetable"}
        </EditBtn>
      </TopBar>

      <GridContainer>
        <HeaderCell></HeaderCell>
        {DAYS.map((day) => <HeaderCell key={day}>{day}</HeaderCell>)}

        {TIME_SLOTS.map((slot, idx) => (
          <React.Fragment key={slot}>
            <HeaderCell>{slot}</HeaderCell>
            {DAYS.map((day) => (
              <GridCell key={day + slot}>
                {getItemsForCell(day, slot, idx).map((item) => (
                  <ItemBox
                    key={item.itemId}
                    style={{
                      height: getDurationHeight(
                        item.classEntity?.startTime || item.event?.startTime,
                        item.classEntity?.endTime || item.event?.endTime
                      ),
                    }}
                  >
                    {item.classEntity ? (
                      <>
                        <strong>{getSubjectName(item.classEntity)}</strong> ({item.classEntity.type})
                        <br />
                        {formatTime(item.classEntity.startTime)} - {formatTime(item.classEntity.endTime)}
                        <br />
                        {item.classEntity.location}
                      </>
                    ) : (
                      <>
                        <strong>{item.event.title}</strong> ({getClubName(item.event)})
                        <br />
                        {formatTime(item.event.startTime)} - {formatTime(item.event.endTime)}
                        <br />
                        {item.event.location}
                      </>
                    )}
                    {editing && (
                      <button onClick={() => removeItem(item.itemId)} style={{ marginTop: 2 }}>
                        Remove
                      </button>
                    )}

                  </ItemBox>
                ))}
              </GridCell>
            ))}
          </React.Fragment>
        ))}
      </GridContainer>

      {editing && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Available Classes</h3>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Day</th>
                <th style={thStyle}>Start Time</th>
                <th style={thStyle}>End Time</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}></th>
              </tr>
            </thead>
            <tbody>
              {availableClasses.map((cls) => (
                <tr key={cls.classId}>
                  <td style={tdStyle}>{cls.subject?.name || `Class ${cls.classId}`}</td>
                  <td style={tdStyle}>{cls.type}</td>
                  <td style={tdStyle}>{cls.dayOfWeek}</td>
                  <td style={tdStyle}>{formatTime(cls.startTime)}</td>
                  <td style={tdStyle}>{formatTime(cls.endTime)}</td>
                  <td style={tdStyle}>{cls.location}</td>
                  <td style={tdStyle}>
                    <button onClick={() => addItem(cls.classId)}>Add</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: "1.5rem" }}>Available Events</h3>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Club</th>
                <th style={thStyle}>Day</th>
                <th style={thStyle}>Start Time</th>
                <th style={thStyle}>End Time</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}></th>
              </tr>
            </thead>
            <tbody>
              {availableEvents.map((ev) => (
                <tr key={ev.eventId}>
                  <td style={tdStyle}>{ev.title}</td>
                  <td style={tdStyle}>{ev.club?.name ?? "No club"}</td>
                  <td style={tdStyle}>{dayMap[ev.eventId]}</td>
                  <td style={tdStyle}>{formatTime(ev.startTime)}</td>
                  <td style={tdStyle}>{formatTime(ev.endTime)}</td>
                  <td style={tdStyle}>{ev.location}</td>
                  <td style={tdStyle}>
                    <button onClick={() => addItem(null, ev.eventId)}>Add</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}
