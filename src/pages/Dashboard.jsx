import { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar";
import { metrics } from "../libs/utils";
import ScheduleSection from "../components/ScheduleSection";
import ActivitySection from "../components/ActivitySection";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const userName = user.username;

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <div className="header">
          <div className="search-container">
            <input type="text" placeholder="Search" className="search-input" />
          </div>
          <div className="user-info">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn">✉️</button>
            <div className="user-profile">
              <span>{userName}</span>
              <div className="avatar">MW</div>
            </div>
          </div>
        </div>

        <div className="income-section">
          <div className="section-header">
            <h2>Income report</h2>
            <div className="filters">
              <select className="filter-select">
                <option>Week</option>
                <option>Month</option>
              </select>
              <select className="filter-select">
                <option>Compare to: Prev week</option>
              </select>
            </div>
          </div>

          <div className="metrics-grid">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={`metric-card ${metric.highlight ? "highlight" : ""}`}
              >
                <div className="metric-header">
                  <span>{metric.title}</span>
                  <span className="percentage">{metric.percentage}</span>
                </div>
                <div className="metric-value">$ {metric.value.toFixed(2)}</div>
                <div className="metric-breakdown">{metric.breakdown}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="main-grid">
          <ScheduleSection />

          <ActivitySection />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
