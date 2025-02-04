import { schedule, timeSlots } from "../libs/utils";

const ScheduleSection = () => {
  return (
    <section className="schedule-section">
      <div className="section-header">
        <h2>Schedule</h2>
        <select className="filter-select">
          <option>This week</option>
        </select>
      </div>

      <div className="schedule-header">
        {schedule.map((day, index) => (
          <div key={index} className="day-column-header">
            <div className="day-label">{day.day}</div>
            <div className="date-label">{day.date}</div>
          </div>
        ))}
      </div>

      <div className="schedule-grid">
        <div className="time-column">
          {timeSlots.map((time, index) => (
            <div
              key={index}
              className="time-label"
              style={{
                top: `${(index * 100) / (timeSlots.length - 1)}%`,
              }}
            >
              {time}
            </div>
          ))}
        </div>

        {schedule.map((day, dayIndex) => (
          <div key={dayIndex} className="day-column">
            {day.appointments.map((apt, aptIndex) => (
              <div
                key={aptIndex}
                className="appointment-card"
                style={{ top: apt.top }}
              >
                <div className="name">{apt.name}</div>
                <div className="time">{apt.time}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScheduleSection;
