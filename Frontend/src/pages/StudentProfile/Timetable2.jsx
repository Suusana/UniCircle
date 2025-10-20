//contributors: gurpreet
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import styled, { keyframes } from "styled-components";
import AvailableTable from "../../components/AvailableTable";
import TimetableGrid from "../../components/TimetableGrid";

// ---- constants ----
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  return `${i.toString().padStart(2, "0")}:00-${((i + 1) % 24)
    .toString()
    .padStart(2, "0")}:00`;
});

//---- styled components ----
const Container = styled.div`
  padding: 20px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
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

const DayHeader = styled.div`
  flex: 1;
  text-align: center;
  font-weight: 600;
  background: #f5f5f5;
  border: 1px solid #ddd;
  padding: 6px 0;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin: 14px 0 6px;
`;

const InputWrap = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const BaseSelect = styled.select`
  width: 100%;
  padding: 12px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.95rem;
  color: ${(props) => (props.value ? "#374151" : "#9ca3af")};
  &:focus {
    border-color: #111827;
    box-shadow: 0 0 0 2px #11182722;
  }
  option[value=""] {
    color: #9ca3af;
  }
  option {
    color: #374151;
  }
`;

const SelectRow = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 24px;
  width: 100%;
  max-width: 400px;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #111827;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const NoTimetableState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  text-align: center;
  color: #555;
`;

const NoTimetableMessage = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const CreateTimetableBtn = styled(EditBtn)`
  padding: 12px 24px;
  font-size: 16px;
  margin-top: 4px;
`;

//---- utility functions ----
const parseDate = (str) => {
  if (!str) return null;
  // handle "YYYY-MM-DD HH:mm:ss" or "YYYY-MM-DDTHH:mm:ss"
  const isoStr = str.includes("T") ? str : str.replace(" ", "T");
  const date = new Date(isoStr);
  return isNaN(date) ? null : date;
};

const formatTime = (str) => {
  const date = parseDate(str);
  return date
    ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "--:--";
};

const getColorForName = (name) => {
  if (!name) return "#4a90e2"; // default
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 65%, 70%)`; // pastel range
};

// text colour for timetable item
const getTextColor = (bgColor) => {
  const hslMatch = bgColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!hslMatch) return "#000";

  const h = Number(hslMatch[1]);
  const s = Number(hslMatch[2]) / 100;
  const l = Number(hslMatch[3]) / 100;

  // convert HSL to RGB
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(color * 255);
  };
  const r = f(0),
    g = f(8),
    b = f(4);

  // perceived brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 160 ? "#333" : "#fff"; // dark text on light bg, white on dark
};

//---- main component ----
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
  const currentYear = new Date().getFullYear();
  const [selectedSemester, setSelectedSemester] = useState("Autumn");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [loading, setLoading] = useState(true);

  const semester = timetable?.semester || selectedSemester;
  const year = timetable?.year || selectedYear;

  //fetch data
  useEffect(() => {
    if (!studentId) return;
    (async () => {
      try {
        setLoading(true); // <--- start loading
        const [timetableRes, classRes, eventRes] = await Promise.all([
          axios.get(`/timetable/student/${studentId}`),
          axios.get(`/timetable/student/${studentId}/classes/available`),
          axios.get(`/timetable/student/${studentId}/events/available`),
        ]);

        setTimetable(timetableRes.data);
        setOriginalItems(timetableRes.data.items ?? []);
        setTempItems(timetableRes.data.items ?? []);

        const map = {};
        eventRes.data.forEach(
          (ev) => (map[ev.eventId] = DAYS[ev.eventId % DAYS.length])
        );
        setDayMap(map);
      } catch (e) {
        console.error("Failed to load timetable:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [studentId]);

  const handleSubmit = async () => {
    if (!timetable?.timetableId) return;

    try {
      // create payload with only IDs
      const payload = tempItems.map((item) => ({
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

  // ---- render ----
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          flexDirection: "column",
        }}
      >
        <Spinner />
      </div>
    );
  }

  //case when there is no timetable
  if (!timetable) {
    return (
      <NoTimetableState>
        <NoTimetableMessage>
          You do not have a timetable yet!
          <br></br> Click the edit button to add timetable
        </NoTimetableMessage>
      </NoTimetableState>
    );
  }

  const getSubjectName = (classEntity) => {
    if (!classEntity) return "";
    return (
      classEntity.subject?.name ||
      availableClasses.find((c) => c.classId === classEntity.classId)?.subject
        ?.name ||
      `Class ${classEntity.classId}`
    );
  };

  const getClubName = (event) => {
    if (!event) return "";
    return (
      event.club?.name ||
      availableEvents.find((e) => e.eventId === event.eventId)?.club?.name ||
      "No club"
    );
  };

  return (
    <Container>
      <div style={{ display: "flex", marginBottom: 2 }}>
        <div style={{ width: 50 }} />
        {DAYS.map((day) => (
          <DayHeader key={day}>{day}</DayHeader>
        ))}
      </div>

      <TimetableGrid
        days={DAYS}
        timeSlots={TIME_SLOTS}
        tempItems={tempItems}
        dayMap={dayMap}
        editing={editing}
        getColorForName={getColorForName}
        getTextColor={getTextColor}
        getSubjectName={getSubjectName}
        getClubName={getClubName}
        formatTime={formatTime}
      />
    </Container>
  );
}
