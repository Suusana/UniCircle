import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";
import { ActionBtn } from "../components/Button";

const Container = styled.div`
  padding: 20px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: right;
  margin-bottom: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px; /* spacing between buttons */
  align-items: center;
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
  position:relative; 
  z-index: 0; 
`;

const GridCell = styled.div`
 border-top: 1px solid #eee;
  border-right: 1px solid #ddd;
  min-height: 50px;
  padding: 2px;
  position: relative;
  overflow: visible; 
  z-index: 0;
`;

const HeaderCell = styled(GridCell)`
  display: flex;
  align-items: center;
  justify-content: center;  
  background: #f5f5f5;      
  border-bottom: 1px solid #ddd;
  font-weight: 600;
`;

const TimeCell = styled.div`
  border-top: 1px solid #eee;
  border-right: 1px solid #ddd;
  font-size: 13px;
  color: #666;
  padding: 2px 4px 0 0;
  text-align: right;       
`;

const ItemBox = styled.div`
  background: #4a90e2;
  border-radius: 6px;
  padding: 6px 8px 4px 8px;
  color: #fff;
  font-size: 13px;
  line-height: 1.2;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 2; 
  left: 1px;
width: calc(100% - 2px);

`;

const RemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 6px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  z-index: 2;

  &:hover {
    color: #ffcccc;
  }
`;


const thStyle = { //class/event tables
  border: "1px solid #ccc",
  padding: "4px",
  textAlign: "left",
  background: "#f0f0f0",
};

const tdStyle = { //timetable item
  border: "1px solid #ccc",
  padding: "4px",
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const start = i;
  const end = (i + 1) % 24;
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
  const [originalItems, setOriginalItems] = useState([]);
  const [tempItems, setTempItems] = useState([]);

  


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
        setOriginalItems(res.data.items || []);
        setTempItems(res.data.items || []);
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

        // sets day for events
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

  const addOrRemoveItem = (classId = null, eventId = null) => {
    // Check if item already exists
    const existingIndex = tempItems.findIndex(item =>
      (classId && item.classEntity?.classId === classId) ||
      (eventId && item.event?.eventId === eventId)
    );

    if (existingIndex !== -1) {
      // Already exists → remove
      setTempItems(tempItems.filter((_, i) => i !== existingIndex));
      return;
    }

    // Prepare new item
    const newItem = {
      itemId: `temp-${Date.now()}`,
      classEntity: classId ? availableClasses.find(c => c.classId === classId) : null,
      event: eventId ? availableEvents.find(e => e.eventId === eventId) : null,
    };

    // Check for clashes
    const newStart = parseDate(newItem.classEntity?.startTime || newItem.event?.startTime);
    const newEnd = parseDate(newItem.classEntity?.endTime || newItem.event?.endTime);

const hasClash = tempItems.some(item => {
  const itemDay = item.classEntity?.dayOfWeek || dayMap[item.event?.eventId];
  const newDay = newItem.classEntity?.dayOfWeek || dayMap[newItem.event?.eventId];
  if (itemDay !== newDay) return false;

  // Use hours/minutes only, ignore the actual date
  const itemStart = parseDate(item.classEntity?.startTime || item.event?.startTime);
  const itemEnd = parseDate(item.classEntity?.endTime || item.event?.endTime);
  const newStartTime = parseDate(newItem.classEntity?.startTime || newItem.event?.startTime);
  const newEndTime = parseDate(newItem.classEntity?.endTime || newItem.event?.endTime);

  const itemStartHour = itemStart.getHours() + itemStart.getMinutes() / 60;
  const itemEndHour = itemEnd.getHours() + itemEnd.getMinutes() / 60;
  const newStartHour = newStartTime.getHours() + newStartTime.getMinutes() / 60;
  const newEndHour = newEndTime.getHours() + newEndTime.getMinutes() / 60;

  return !(newEndHour <= itemStartHour || newStartHour >= itemEndHour);
});


    if (hasClash) {
      alert("Cannot add item: it clashes with an existing timetable item.");
      return;
    }

    setTempItems([...tempItems, newItem]);
  };



  const removeItem = async (itemId) => {
    setTempItems(tempItems.filter(item => item.itemId !== itemId));
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

  const TIMETABLE_START_HOUR = 0;
  const SLOT_HEIGHT = 70; // px per hour

  const getTop = (item) => {
    const startStr = item.classEntity?.startTime || item.event?.startTime;
    const start = parseDate(startStr);
    if (!start) return 0;
    return (start.getHours() + start.getMinutes() / 60 - TIMETABLE_START_HOUR) * SLOT_HEIGHT;
  };

  const getHeight = (item) => {
    const startStr = item.classEntity?.startTime || item.event?.startTime;
    const endStr = item.classEntity?.endTime || item.event?.endTime;
    const start = parseDate(startStr);
    const end = parseDate(endStr);
    if (!start || !end) return 0;
    const durationHours = (end - start) / (1000 * 60 * 60);
    return durationHours * SLOT_HEIGHT;
  };


  const handleSubmit = async () => {
    if (!timetable?.timetableId) return;

    try {
      // create payload with only IDs
      const payload = tempItems.map(item => ({
        classId: item.classEntity?.classId ?? null,
        eventId: item.event?.eventId ?? null,
      }));

      await axios.post(`/timetable/${timetable.timetableId}/update`, payload);

      // update local state
      setOriginalItems([...tempItems]);
      setTimetable({ ...timetable, items: [...tempItems] });
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save timetable.");
    }
  };

  const handleDiscard = () => {
    setTempItems([...originalItems]);
    setEditing(false);
  };



  const getDurationHeight = (startStr, endStr) => {
    const start = parseDate(startStr);
    const end = parseDate(endStr);
    if (!start || !end) return 0;
    const diffMinutes = (end - start) / (1000 * 60);
    return (diffMinutes / 60) * SLOT_HEIGHT; // accurate proportion of slot height
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
        <EditBtn onClick={createTimetable}>Create Timetable</EditBtn>
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


  const getColorForName = (name) => {
    if (!name) return "#4a90e2"; // default
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 65%, 70%)`; // pastel range
  };



  return (
    <Container>
      <TopBar>
        <Title>My Timetable ({semester} {year})</Title>
        <ButtonGroup>
          <EditBtn onClick={() => {
            if (editing) handleSubmit(); // submit
            else setEditing(true);
          }}>
            {editing ? "Submit Timetable" : "Edit Timetable"}
          </EditBtn>

          {editing && ( //should add HOVER 
            <EditBtn onClick={handleDiscard} style={{ marginLeft: "8px", backgroundColor: "#ccc", color: "#000" }}>
              Discard Changes
            </EditBtn>
          )}
        </ButtonGroup>
      </TopBar>



      <div style={{ display: "flex", marginBottom: 2 }}>
        <div style={{ width: 120 }} />
        {DAYS.map((day) => (
          <div
            key={day}
            style={{
              flex: 1,
              textAlign: "center",
              fontWeight: 600,
              background: "#f5f5f5",
              border: "1px solid #ddd",
              padding: "6px 0",
            }}
          >
            {day}
          </div>
        ))}
      </div>




      <GridContainer style={{ display: "flex" }}>
        <div style={{ width: 120, position: "relative" }}>
          {TIME_SLOTS.map((slot, i) => (
            <TimeCell
              key={slot}
              style={{
                position: "absolute",
                top: i * SLOT_HEIGHT,
                left: 0,
                right: 0,
                height: SLOT_HEIGHT,
              }}
            >
              {slot}
            </TimeCell>
          ))}
        </div>



        {DAYS.map((day) => (
          <div
            key={day}
            style={{
              flex: 1,
              position: "relative",
              borderLeft: "1px solid #ccc",
              minHeight: (TIME_SLOTS.length) * SLOT_HEIGHT,
            }}
          >

            {TIME_SLOTS.map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: i * SLOT_HEIGHT,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: "#eee",
                }}
              />
            ))}


            {tempItems
              .filter((item) => {
                const displayDay = item.classEntity?.dayOfWeek || dayMap[item.event?.eventId];
                return displayDay === day;
              })
              .map((item) => (
                <ItemBox
                  key={item.itemId}
                  style={{
                    top: getTop(item),
                    height: getHeight(item),
                    background: item.classEntity ?
                      getColorForName(getSubjectName(item.classEntity)) : getColorForName(getClubName(item.event)),
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
                    <RemoveButton onClick={() => removeItem(item.itemId)}>×</RemoveButton>
                  )}
                </ItemBox>
              ))}
          </div>
        ))}
      </GridContainer>


      {editing && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Available Classes</h3>
          {availableClasses.length === 0 ? (
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                background: "#fafafa",
                color: "#777",
                marginBottom: "1.5rem",
              }}
            >
              No available classes to add.
            </div>
          ) : (
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
                      <ActionBtn
                        onClick={() => addOrRemoveItem(cls.classId)}
                        style={{
                          backgroundColor: tempItems.some(item => item.classEntity?.classId === cls.classId)
                            ? "#e74c3c" // red for Remove
                            : undefined, // green for Add
                          cursor: "pointer",
                          color: "#fff",
                        }}
                      >
                        {tempItems.some(item => item.classEntity?.classId === cls.classId) ? "Remove" : "Add"}
                      </ActionBtn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <h3 style={{ marginTop: "1.5rem" }}>Available Events</h3>
          {availableEvents.length === 0 ? (
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                background: "#fafafa",
                color: "#777",
              }}
            >
              No available events to add.
            </div>
          ) : (
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
                      <ActionBtn
                        onClick={() => addOrRemoveItem(null, ev.eventId)}
                        style={{
                          backgroundColor: tempItems.some(item => item.event?.eventId === ev.eventId)
                            ? "#e74c3c" // red for Remove
                            : undefined, // green for Add
                          cursor: "pointer",
                          color: "#fff",
                        }}
                      >
                        {tempItems.some(item => item.event?.eventId === ev.eventId) ? "Remove" : "Add"}
                      </ActionBtn>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </Container>
  );
}

