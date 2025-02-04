import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'
import "../styles/Dashboard.css"
import Sidebar from '../components/Sidebar'

const Dashboard = () => {

  const [metrics] = useState([
    {
      title: 'Revenue',
      value: 876.00,
      breakdown: '$ 645.00 + $ 231.00',
      percentage: '+17%',
      highlight: true
    },
    {
      title: 'Service revenue',
      value: 435.00,
      breakdown: '$ 355.00 + $ 80.00',
      percentage: '+7%'
    },
    {
      title: 'Earned today',
      value: 344.00,
      breakdown: '$ 208.00 + $ 136.00',
      percentage: '+27%'
    }
  ])

  const timeSlots = ['8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm']
  
  const [schedule] = useState([
    {
      day: 'Mon',
      date: '18',
      appointments: []
    },
    {
      day: 'Tue',
      date: '19',
      appointments: [
        { name: 'Lukas Tapia', time: '9 - 10 am', top: '12.5%' },
        { name: 'Sarah Perry', time: '1 - 2 pm', top: '62.5%' }
      ]
    },
    {
      day: 'Wed',
      date: '20',
      appointments: [
        { name: 'Lora Montes', time: '8 - 9 am', top: '0%' }
      ]
    },
    {
      day: 'Thu',
      date: '21',
      appointments: [
        { name: 'Mark Smith', time: '10 - 11 am', top: '25%' },
        { name: 'Lukas Tapia', time: '1 - 2 pm', top: '62.5%' }
      ]
    },
    {
      day: 'Fri',
      date: '22',
      appointments: [
        { name: 'Sarah Perry', time: '8 - 9 am', top: '0%' }
      ]
    }
  ])

  const [activities] = useState([
    {
      name: 'Mark Smith',
      action: 'Added 2 photos in Food Diary',
      time: '15 min'
    },
    {
      name: 'Sarah Perry',
      action: 'Added 4 photos in Progress photos',
      time: '1h'
    },
    {
      name: 'Lukas Tapia',
      action: 'Uploaded a new video',
      time: '2h'
    }
  ])

  // const userName = localStorage.getItem("persist:auth")
  const user = useSelector((state) => state.auth.user);
  const userName =user.username;


  return (
    <div className="dashboard">
      <Sidebar/>
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
                className={`metric-card ${metric.highlight ? 'highlight' : ''}`}
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
                    style={{ top: `${(index * 100) / (timeSlots.length - 1)}%` }}
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
                      {activity.name.split(' ').map(n => n[0]).join('')}
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
        </div>
      </main>
    </div>
  )
}

export default Dashboard