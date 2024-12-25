import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faFutbol, faHandPaper, faSquare } from '@fortawesome/free-solid-svg-icons'; // Updated faHandPaper

const Results = () => {
  const [playerStats, setPlayerStats] = useState({
    topGoals: null,
    redCards: [],
    yellowCards: []
  });

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/player-stats/result');
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
  }, []);

  const renderCard = (title, value, description, icon, colorClass) => (
    <div className={`p-6 rounded-lg shadow-lg border ${colorClass} mb-4`}>
      <div className="flex items-center mb-4">
        <FontAwesomeIcon icon={icon} className={`text-3xl mr-4 ${colorClass}`} />
        <h3 className="text-2xl font-semibold">{title}</h3>
      </div>
      <p className="text-lg font-medium text-gray-700">{value}</p>
      <p className=" bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-mpRegular text-lg">{description}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 max-w-4xl">
      {/* Award Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Giải thưởng</h2>
        {renderCard(
          'Đội Vô địch',
          '1.200.000 VNĐ',
          'Đang cập nhật...',
          faTrophy,
          'border-yellow-500 text-yellow-500'
        )}
        {renderCard(
          'Đội Nhì',
          '??? VNĐ',
          'Đang cập nhật...',
          faTrophy,
          'border-gray-400 text-gray-400'
        )}
        {renderCard(
          'Đội Ba',
          '??? VNĐ',
          'Đang cập nhật...',
          faTrophy,
          'border-orange-400 text-orange-400'
        )}
        {renderCard(
          'Cầu thủ xuất sắc (vua phá lưới)',
          '500.000 VNĐ',
          playerStats.topGoals
            ? `${playerStats.topGoals.name} (${playerStats.topGoals.goals} bàn thắng)`
            : 'Đang cập nhật...',
          faFutbol, // Soccer ball icon
          'border-green-500 text-green-500'
        )}
        {renderCard(
          'Thủ môn xuất sắc',
          '500.000 VNĐ',
          'Đang cập nhật...',
          faHandPaper, // Updated to hand paper icon
          'border-blue-500 text-blue-500'
        )}
      </div>

      {/* Disciplinary Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Kỷ luật</h2>
        {renderCard(
          'Thẻ đỏ',
          '100.000 VNĐ',
          playerStats.redCards.length > 0
            ? playerStats.redCards.map(player => `${player.name} (${player.red_cards} thẻ)`).join(', ')
            : 'Không có cầu thủ nào có thẻ đỏ.',
          faSquare,
          'border-red-500 text-red-500'
        )}
        {renderCard(
          'Thẻ vàng',
          '50.000 VNĐ',
          playerStats.yellowCards.length > 0
            ? playerStats.yellowCards.map(player => `${player.name} (${player.yellow_cards} thẻ)`).join(', ')
            : 'Không có cầu thủ nào có thẻ vàng.',
          faSquare,
          'border-yellow-500 text-yellow-500'
        )}
      </div>
    </div>
  );
};

export default Results;