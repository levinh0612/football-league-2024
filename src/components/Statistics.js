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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Thay thế bằng URL API thực tế của bạn
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/player-stats');
        
        // Giả sử API trả về cấu trúc như thế này:
        // response.data = { topGoals, topYellowCards, topRedCards }
        setPlayersStats({
          topGoals: response.data.topGoals,
          topYellowCards: response.data.topYellowCards,
          topRedCards: response.data.topRedCards,
        });
        setLoading(false);
      } catch (err) {
        setError('Không thể tải dữ liệu');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      {/* BXH Cầu thủ ghi bàn nhiều nhất */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white">Cầu thủ ghi bàn nhiều nhất</h2>
        <ul className="mt-4 space-y-2">
          {playersStats.topGoals.map((player, index) => (
            <li key={index} className="flex justify-between text-white">
              <span>{player.name}</span>
              <span>{player.goals} Bàn</span>
            </li>
          ))}
        </ul>
      </div>

      {/* BXH Cầu thủ có thẻ vàng nhiều nhất */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white">Cầu thủ có thẻ vàng nhiều nhất</h2>
        <ul className="mt-4 space-y-2">
          {playersStats.topYellowCards.map((player, index) => (
            <li key={index} className="flex justify-between text-white">
              <span>{player.name}</span>
              <span>{player.yellow_cards} Thẻ Vàng</span>
            </li>
          ))}
        </ul>
      </div>

      {/* BXH Cầu thủ có thẻ đỏ nhiều nhất */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white">Cầu thủ có thẻ đỏ nhiều nhất</h2>
        <ul className="mt-4 space-y-2">
          {playersStats.topRedCards.map((player, index) => (
            <li key={index} className="flex justify-between text-white">
              <span>{player.name}</span>
              <span>{player.red_cards} Thẻ Đỏ</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Statistics;