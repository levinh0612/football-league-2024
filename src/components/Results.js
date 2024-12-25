import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faFutbol, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

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

  return (
    <div className="container mx-auto px-12 pt-2 pb-2 bg-white text-black rounded-lg shadow-lg max-w-4xl">
      {/* Award Section */}
      <div className="mb-12 bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
          <FontAwesomeIcon icon={faTrophy} className="text-yellow-500 mr-4" />
          Giải thưởng (Tùy vào ngân sách giải đấu)
        </h2>
        <ul className="list-none pl-0 space-y-6">
          <li className="flex items-center text-gray-800">
            <FontAwesomeIcon icon={faTrophy} className="text-yellow-500 mr-6 text-3xl" />
            <span className="font-semibold text-xl">Đội Vô địch:</span> 
            <span className="mx-4">{'(1.200.000 VNĐ)'}</span>
            <span className="mx-4">Đang cập nhật...</span>
          </li>
          <li className="flex items-center text-gray-800">
            <FontAwesomeIcon icon={faTrophy} className="text-gray-400 mr-6 text-3xl" />
            <span className="font-semibold text-xl">Đội Nhì:</span> 
            <span className="mx-4">{'(??? VNĐ)'}</span>
            <span className="mx-4">Đang cập nhật...</span>
          </li>
          <li className="flex items-center text-gray-800">
            <FontAwesomeIcon icon={faTrophy} className="text-orange-400 mr-6 text-3xl" />
            <span className="font-semibold text-xl">Đội Ba:</span> 
            <span className="mx-4">{'(??? VNĐ)'}</span>
            <span className="mx-4">Đang cập nhật...</span>
          </li>
          <li className="text-gray-800 text-xl">
            <span className="font-semibold">Cầu thủ xuất sắc (vua phá lưới):</span>
            <span className="mx-4">{'(500.000 VNĐ)'}</span>
            <div className="flex center">
              {playerStats.topGoals ? (
                <span className="text-green-600 text-center"> {playerStats.topGoals.name} ({playerStats.topGoals.goals} bàn thắng)</span>
              ) : (
                <span className="text-gray-500 text-center">Đang cập nhật...</span>
              )}
            </div>
          </li>
          <li className="text-gray-800 text-xl">
            <span className="font-semibold">Thủ môn xuất sắc (5 đội trưởng cùng bình chọn):</span> 
            <span className="mx-4">{'(500.000 VNĐ)'}</span>
            <div className="flex center">
              <span className="text-gray-500 mx-4">Đang cập nhật...</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Disciplinary Section */}
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 mr-4 text-3xl" />
          Kỷ luật (Xung vào quỹ giải đi nhậu)
        </h2>
        <ul className="list-none pl-0 space-y-6">
          <li className="flex items-center text-gray-800 text-xl">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 mr-6 text-3xl" />
            <span className="font-semibold text-xl">Thẻ đỏ:</span> 
            <span className="mx-2">{'(100.000 VNĐ)'}</span>
            {playerStats.redCards.length > 0 ? (
              <ul className="pl-8 text-red-500 space-y-2">
                {playerStats.redCards.map(player => (
                  <li key={player.name}>
                    <span>
                    {player.name} ({player.red_cards} thẻ)
                      </span>
                    </li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-500 ml-4">Không có cầu thủ nào có thẻ đỏ.</span>
            )}
          </li>
          <li className="flex items-center text-gray-800 text-xl">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 mr-6 text-3xl" />
            <span className="font-semibold text-xl">Thẻ vàng:</span>
            <span className="mx-2">{'(50.000 VNĐ)'}</span>

            {playerStats.yellowCards.length > 0 ? (
              <ul className="pl-8 text-yellow-500 space-y-2">
                {playerStats.yellowCards.map(player => (
                  <li key={player.name}>
                    <span>{player.name} ({player.yellow_cards} thẻ)</span>
                    </li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-500">Không có cầu thủ nào có thẻ vàng.</span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Results;