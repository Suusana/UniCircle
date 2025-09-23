import { useState } from "react";
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

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #0b0f17;
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

const WeekBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Arrow = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  padding: 4px 8px;
  border-radius: 6px;
  &:hover {
    background: #f2f2f2;
  }
`;

const TimetableGrid = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(5, 1fr);
  grid-template-rows: 44px repeat(
      ${(props) => props.hours},
      ${(props) => props.rowHeight}px
    );
  border: 1px solid #ddd;
  position: relative;
`;

const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
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

const DayCell = styled.div`
  border-top: 1px solid #eee;
  border-right: 1px solid #ddd;
  position: relative;
`;

const Event = styled.div`
  border-radius: 6px;
  padding: 4px 6px;
  color: #fff;
  font-size: 13px;
  line-height: 1.2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  margin: 2px;
  z-index: 1;
  position: relative;
`;

const START_HOUR = 8;
const END_HOUR = 20;
const ROW_HEIGHT = 50;
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const COLORS = [
  "#4a90e2",
  "#e94e77",
  "#50e3c2",
  "#f5a623",
  "#7b61ff",
  "#2ecc71",
  "#ff6f61",
];

const SAMPLE_EVENTS = [
  {
    id: 1,
    type: "subject",
    subjectCode: "CS101",
    eventType: "Lecture",
    location: "Room A1",
    day: 0,
    start: 9,
    end: 11,
    color: COLORS[0],
  },
  {
    id: 2,
    type: "subject",
    subjectCode: "MATH201",
    eventType: "Tutorial",
    location: "Room B2",
    day: 2,
    start: 14,
    end: 16,
    color: COLORS[1],
  },
  {
    id: 3,
    type: "club",
    clubName: "Robotics Club",
    location: "Lab C3",
    day: 4,
    start: 17,
    end: 19,
    color: COLORS[2],
  },
];

export default function Timetable() {
  const [weekOffset, setWeekOffset] = useState(0);
  const hours = END_HOUR - START_HOUR;

  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7) + weekOffset * 7);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const label = `${monday.toLocaleDateString(
    "en-GB"
  )} – ${sunday.toLocaleDateString("en-GB")}`;

  return (
    <Container>
      <TopBar>
        <Title>Spring 2025 Timetable</Title>
        <EditBtn>Edit Timetable</EditBtn>
      </TopBar>

      <WeekBar>
        <Arrow onClick={() => setWeekOffset((w) => w - 1)}>{"<"}</Arrow>
        <span>{label}</span>
        <Arrow onClick={() => setWeekOffset((w) => w + 1)}>{">"}</Arrow>
      </WeekBar>

      <TimetableGrid hours={hours} rowHeight={ROW_HEIGHT}>
        <HeaderCell style={{ gridColumn: 1, gridRow: 1 }}> </HeaderCell>
        {DAYS.map((d, i) => (
          <HeaderCell key={i} style={{ gridColumn: i + 2, gridRow: 1 }}>
            {d}
          </HeaderCell>
        ))}
        {Array.from({ length: hours }, (_, i) => (
          <TimeCell key={i} style={{ gridColumn: 1, gridRow: i + 2 }}>
            {START_HOUR + i}:00
          </TimeCell>
        ))}
        {DAYS.map((_, day) =>
          Array.from({ length: hours }, (_, i) => (
            <DayCell
              key={day + "-" + i}
              style={{ gridColumn: day + 2, gridRow: i + 2 }}
            />
          ))
        )}
        {SAMPLE_EVENTS.map((e) => {
          const startRow = e.start - START_HOUR + 2;
          const endRow = e.end - START_HOUR + 2;
          return (
            <Event
              key={e.id}
              style={{
                gridColumn: e.day + 2,
                gridRow: `${startRow} / ${endRow}`,
                background: e.color,
              }}
            >
              {e.type === "subject" ? (
                <>
                  <b>{e.subjectCode}</b> {e.eventType}
                  <br />
                  {e.start}:00–{e.end}:00
                  <br />
                  {e.location}
                </>
              ) : (
                <>
                  <b>{e.clubName}</b>
                  <br />
                  {e.start}:00–{e.end}:00
                  <br />
                  {e.location}
                </>
              )}
            </Event>
          );
        })}
      </TimetableGrid>
    </Container>
  );
}
