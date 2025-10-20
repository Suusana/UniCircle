//contributor: gurpreet
//component to display the timetable grid in the Timetable.jsx page
import styled from "styled-components";

// ---- constants ----
const SLOT_HEIGHT = 70;
const TIMETABLE_START_HOUR = 0;

// ---- styled components ----
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 120px repeat(${({ days }) => days.length}, 1fr);
  border: 1px solid #ccc;
  position: relative;
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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 0;
  left: 1px;
  box-sizing: border-box;
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
  &:hover {
    color: #ffcccc;
  }
`;

// ---- utility functions ----
const parseDate = (str) => {
  if (!str) return null;
  const isoStr = str.includes("T") ? str : str.replace(" ", "T");
  const date = new Date(isoStr);
  return isNaN(date) ? null : date;
};

const getTop = (item, startHour = TIMETABLE_START_HOUR) => {
  const start = parseDate(item.classEntity?.startTime || item.event?.startTime);
  if (!start) return 0;
  return (start.getHours() + start.getMinutes() / 60 - startHour) * SLOT_HEIGHT;
};

const getHeight = (item) => {
  const start = parseDate(item.classEntity?.startTime || item.event?.startTime);
  const end = parseDate(item.classEntity?.endTime || item.event?.endTime);
  if (!start || !end) return 0;
  return ((end - start) / (1000 * 60 * 60)) * SLOT_HEIGHT;
};

// ---- component ----
export default function TimetableGrid({
  days,
  timeSlots,
  tempItems,
  dayMap,
  editing,
  removeItem,
  getColorForName,
  getTextColor,
  getSubjectName,
  getClubName,
  formatTime,
}) {
  return (
    <GridContainer days={days}>
      {/* time column */}
      <div style={{ width: 120, position: "relative" }}>
        {timeSlots.map((slot, i) => (
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

      {/* day columns */}
      {days.map((day) => (
        <div
          key={day}
          style={{
            flex: 1,
            position: "relative",
            borderLeft: "1px solid #ccc",
            minHeight: timeSlots.length * SLOT_HEIGHT,
          }}
        >
          {/* horizontal grid lines */}
          {timeSlots.map((_, i) => (
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

          {/* timetable items */}
          {tempItems
            .filter((item) => {
              const displayDay =
                item.classEntity?.dayOfWeek || dayMap[item.event?.eventId];
              return displayDay === day;
            })
            .map((item) => {
              const bgColor = item.classEntity
                ? getColorForName(getSubjectName(item.classEntity))
                : getColorForName(getClubName(item.event));

              const textColor = item.classEntity
                ? getTextColor(bgColor)
                : getTextColor(bgColor);

              return (
                <ItemBox
                  key={item.itemId}
                  style={{
                    top: getTop(item),
                    height: getHeight(item),
                    background: bgColor,
                    color: textColor,
                  }}
                >
                  {item.classEntity ? (
                    <>
                      <strong>{getSubjectName(item.classEntity)}</strong> (
                      {item.classEntity.type})
                      <br />
                      {formatTime(item.classEntity.startTime)} -{" "}
                      {formatTime(item.classEntity.endTime)}
                      <br />
                      {item.classEntity.location}
                    </>
                  ) : (
                    <>
                      <strong>{item.event.title}</strong> (
                      {getClubName(item.event)})
                      <br />
                      {formatTime(item.event.startTime)} -{" "}
                      {formatTime(item.event.endTime)}
                      <br />
                      {item.event.location}
                    </>
                  )}
                  {editing && (
                    <RemoveButton onClick={() => removeItem(item.itemId)}>
                      ×
                    </RemoveButton>
                  )}
                </ItemBox>
              );
            })}
        </div>
      ))}
    </GridContainer>
  );
}
