import React, { useState, useEffect, useMemo } from 'react';
import { getDashboardMetrics } from '../../../services/api';
import './Stats.css';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const INITIAL_METRICS_STATE = {
  totalChats: 0,
  resolvedTickets: { count: 0, percentage: 0 },
  averageReplyTime: { seconds: 0, formatted: '0 secs' },
};

const Stats = () => {
  const [metrics, setMetrics] = useState(INITIAL_METRICS_STATE);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metricsResponse = await getDashboardMetrics({});
        console.log("API Response Data:", metricsResponse.data);

        if (metricsResponse.data) {
          setMetrics(metricsResponse.data);
        } else {
          console.error("API response returned an empty or invalid data object.");
          setError("API response error: Metrics data object is empty.");
        }

        const mockChartData = [13, 9, 15, 9, 5, 12, 3, 9, 17, 18];
        setChartData(mockChartData);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard metrics. Check server connection or token.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const lineChartData = useMemo(() => {
    const labels = Array.from({ length: chartData.length }, (_, i) => `Week ${i + 1}`);
    const weekSixIndex = 5;

    return {
      labels,
      datasets: [
        {
          label: 'Chats',
          data: chartData,
          borderColor: '#00C851',
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          fill: false,
          tension: 0.4,
          pointRadius: chartData.map((_, index) => index === weekSixIndex ? 7 : 5),
          pointBackgroundColor: chartData.map((_, index) => 
            index === weekSixIndex ? '#FFFFFF' : '#00C851'
          ),
          pointBorderColor: chartData.map((_, index) => 
            index === weekSixIndex ? '#000000' : '#00C851'
          ),
          pointBorderWidth: chartData.map((_, index) => index === weekSixIndex ? 2 : 0),
          pointHoverRadius: 8,
        },
      ],
    };
  }, [chartData]);

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: '#000',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 10,
        displayColors: false,
        callbacks: {
          title: () => 'Chats',
          label: (context) => `${context.parsed.y}`,
        },
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 25,
        ticks: { 
          stepSize: 5,
          color: '#999',
          font: { size: 11 }
        },
        grid: { 
          display: true,
          color: '#f0f0f0',
          drawBorder: false
        },
        border: { display: false }
      },
      x: {
        ticks: { 
          color: '#999',
          font: { size: 11 }
        },
        grid: { display: false },
        border: { display: false }
      },
    },
  };

  if (loading) return <div className="stats-container">Loading dashboard data...</div>;
  if (error) return <div className="stats-container stats-error">Error: {error}</div>;

  const avgReplyFormatted = metrics.stats?.averageReplyTime?.formatted || INITIAL_METRICS_STATE.averageReplyTime.formatted;
  const resolvedPercent = metrics.stats?.resolvedTickets?.percentage || INITIAL_METRICS_STATE.resolvedTickets.percentage;
  const totalChatsCount = metrics.stats?.totalChats || INITIAL_METRICS_STATE.totalChats;

  return (
    <div className="stats-container">
      <div className="analytics-header">Analytics</div>

      <section className="missed-chats-section">
        <div className="section-header">
          <h2 className="section-title green-text">Missed Chats</h2>
          <button className="menu-button">⋯</button>
        </div>
        <div className="chart-wrapper">
          {chartData.length > 0 ? (
            <Line data={lineChartData} options={lineChartOptions} />
          ) : (
            <p>No chat data available for the chart.</p>
          )}
        </div>
      </section>

      <section className="metric-section">
        <h2 className="section-title green-text">Average Reply time</h2>
        <div className="metric-row">
          <p className="metric-description">
            For highest customer satisfaction rates you should aim to reply to an incoming customer's 
            message in 15 seconds or less. Quick responses will get you more conversations, help you 
            earn customers' trust and make more sales.
          </p>
          <div className="metric-value green-text">
            {avgReplyFormatted}
          </div>
        </div>
      </section>

      <section className="metric-section">
        <h2 className="section-title green-text">Resolved Tickets</h2>
        <div className="metric-row">
          <p className="metric-description">
            A callback system on a website, as well as proactive invitations, help to attract even 
            more customers. A separate round button for ordering a call with a small animation helps 
            to motivate more customers to make calls.
          </p>
          <div className="doughnut-container">
            <svg width="85" height="85" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#E8E8E8"
                strokeWidth="12"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#00C851"
                strokeWidth="12"
                strokeDasharray={`${(resolvedPercent / 100) * 314} 314`}
                strokeDashoffset="0"
                transform="rotate(-90 60 60)"
                strokeLinecap="round"
              />
              <text
                x="60"
                y="65"
                textAnchor="middle"
                fontSize="20"
                fontWeight="bold"
                fill="#00C851"
              >
                {resolvedPercent}%
              </text>
            </svg>
          </div>
        </div>
      </section>

      <section className="metric-section">
        <h2 className="section-title">Total Chats</h2>
        <div className="metric-row">
          <p className="metric-description">
            This metric Shows the total number of chats for all Channels for the selected the 
            selected period
          </p>
          <div className="metric-value green-text">
            {totalChatsCount} Chats
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stats;