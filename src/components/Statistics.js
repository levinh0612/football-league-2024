import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = () => {
  const [playersStats, setPlayersStats] = useState({
    topGoals: [],
    topYellowCards: [],
    topRedCards: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stats from the API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/player-stats`);
        setPlayersStats(response.data); // Assume API returns an object like { topGoals, topYellowCards, topRedCards }
      } catch (err) {
        setError('Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Loading and error states
  if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  // Render statistics
  const renderStats = (title, stats, statKey) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <ul className="mt-4 space-y-2">
        {stats.map((player, index) => (
          <li key={index} className="flex justify-between text-white">
            <p>{player.name}</p>
            <p>{player[statKey]} Thẻ</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      {renderStats('Cầu thủ ghi bàn nhiều nhất', playersStats.topGoals, 'goals')}
      {renderStats('Cầu thủ có thẻ vàng nhiều nhất', playersStats.topYellowCards, 'yellow_cards')}
      {renderStats('Cầu thủ có thẻ đỏ nhiều nhất', playersStats.topRedCards, 'red_cards')}
    </div>
  );
};

export default Statistics;