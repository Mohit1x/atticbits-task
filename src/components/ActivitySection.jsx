import { activities } from "../libs/utils";

const ActivitySection = () => {
  return (
    <div className="side-sections">
      <section className="clients-activity">
        <div className="activity-header">
          <h2>Clients Activity</h2>
          <select className="filter-select">
            <option>All</option>
          </select>
        </div>

        <div className="activity-list">
          {activities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-avatar">
                {activity.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="activity-content">
                <div className="activity-name">{activity.name}</div>
                <div className="activity-description">{activity.action}</div>
              </div>
              <div className="activity-time">{activity.time}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="completion-section">
        <div className="section-header">
          <h2>Task Completion</h2>
        </div>
        <div className="completion-chart">
          <div className="chart-circle">
            <span className="percentage">71%</span>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <span className="dot complete"></span>
              <span>Complete</span>
            </div>
            <div className="legend-item">
              <span className="dot missed"></span>
              <span>Missed</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActivitySection;
