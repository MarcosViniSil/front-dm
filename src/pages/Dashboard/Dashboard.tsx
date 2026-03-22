import { useState, useEffect } from 'react';
import './Dashboard.css';

interface StatCard {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
}

const MOCK_STATS: StatCard[] = [
  { label: 'Users', value: '1,284', trend: 'up' },
  { label: 'Revenue', value: '$12.4k', trend: 'up' },
  { label: 'Sessions', value: '8,942', trend: 'neutral' },
  { label: 'Bounce Rate', value: '24.3%', trend: 'down' },
];

function Dashboard(){
  const [stats, setStats] = useState<StatCard[]>([]);

  useEffect(() => {
    // Simulate fetching data — replace with a real service call
    const timer = setTimeout(() => setStats(MOCK_STATS), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page dashboard-page">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        {stats.length === 0
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="stat-card skeleton" />
            ))
          : stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">{stat.value}</span>
                <span className={`stat-trend ${stat.trend}`}>
                  {stat.trend === 'up' && '↑'}
                  {stat.trend === 'down' && '↓'}
                  {stat.trend === 'neutral' && '→'}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
