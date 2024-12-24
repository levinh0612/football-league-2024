import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Results = () => {
  const [playerStats, setPlayerStats] = useState({
    topGoals: null,
    redCards: [],
    yellowCards: []
  });

  useEffect(() => {
    // Fetch the player stats from the API
    const fetchPlayerStats = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL +'/player-stats/result');
        setPlayerStats({
          topGoals: response.data.topGoals,
          redCards: response.data.redCards,
          yellowCards: response.data.yellowCards
        });
      } catch (error) {
        console.error('Error fetching player stats:', error);
      }
    };

    fetchPlayerStats();
  }, []); // Empty dependency array means this runs only once after the component mounts

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Giải thưởng & Kỷ luật</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Giải thưởng (Tùy vào ngân sách giải đấu)</h2>
        <ul className="list-disc pl-6">
          <li><span className="font-semibold">Đội Vô địch:</span> 1.200.000</li>
          <li><span className="font-semibold">Đội Nhì:</span> Bổ Sung Sau</li>
          <li><span className="font-semibold">Đội Ba:</span> Bổ Sung Sau</li>
          <li><span className="font-semibold">Cầu thủ xuất sắc (vua phá lưới):</span> 
            {playerStats.topGoals ? (
              <span>{playerStats.topGoals.name} ({playerStats.topGoals.goals} bàn thắng)</span>
            ) : (
              'Đang cập nhật...'
            )}
          </li>
          <li><span className="font-semibold">Thủ môn xuất sắc (5 đội trưởng cùng bình chọn):</span> 500.000</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Kỷ luật (Xung vào quỹ giải đi nhậu)</h2>
        <ul className="list-disc pl-6">
          <li><span className="font-semibold">Thẻ đỏ:</span> 100k 
            {playerStats.redCards.length > 0 ? (
              <ul className="pl-4">
                {playerStats.redCards.map(player => (
                  <li key={player.name}>{player.name} ({player.red_cards} thẻ đỏ)</li>
                ))}
              </ul>
            ) : (
              'Không có cầu thủ nào có thẻ đỏ.'
            )}
          </li>
          <li><span className="font-semibold">Thẻ vàng:</span> 50k
            {playerStats.yellowCards.length > 0 ? (
              <ul className="pl-4">
                {playerStats.yellowCards.map(player => (
                  <li key={player.name}>{player.name} ({player.yellow_cards} thẻ vàng)</li>
                ))}
              </ul>
            ) : (
              'Không có cầu thủ nào có thẻ vàng.'
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Results;