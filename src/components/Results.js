import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faFutbol, faHandPaper, faSquare } from '@fortawesome/free-solid-svg-icons';

const Results = () => {
  const [playerStats, setPlayerStats] = useState({
    topGoals: null,
    redCards: [],
    yellowCards: [],
    prizes: []
  });

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/player-stats/result');
        setPlayerStats({
          topGoals: response.data.topGoals,
          redCards: response.data.redCards,
          yellowCards: response.data.yellowCards,
          prizes: response.data.prizes
        });
      } catch (error) {
        console.error('Error fetching player stats:', error);
      }
    };

    fetchPlayerStats();
  }, []);

  const groupByTeam = (cards) => {
    return cards.reduce((acc, player) => {
      if (!acc[player.team_name]) {
        acc[player.team_name] = [];
      }
      acc[player.team_name].push(player);
      return acc;
    }, {});
  };

  const getColorClass = (tag) => {
    switch (tag) {
      case 'top1': return 'border-yellow-500 text-yellow-500';
      case 'top2': return 'border-gray-400 text-gray-400';
      case 'top3': return 'border-orange-400 text-orange-400';
      case 'topGoals': return 'border-green-500 text-green-500';
      case 'topGk': return 'border-blue-500 text-blue-500';
      default: return 'border-gray-500 text-gray-500';
    }
  };

  const getIcon = (tag) => {
    switch (tag) {
      case 'topGoals': return faFutbol;
      case 'topGk': return faHandPaper;
      default: return faTrophy;
    }
  };

  const renderCard = (title, value, description, icon, colorClass, isGrouped = false, data = []) => {
    if (isGrouped) {
      const groupedData = groupByTeam(data);
      return (
        <div className={`p-6 rounded-lg shadow-lg border ${colorClass} mb-4`}>
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={icon} className={`text-3xl mr-4 ${colorClass}`} />
            <h3 className="text-2xl font-semibold">{title}</h3>
          </div>
          <p className="text-lg font-medium text-gray-700">{value}</p>
          {
            Object.entries(groupedData).length > 0 ? (
              <div className="mt-4">
                {Object.entries(groupedData).map(([teamName, players]) => (
                  <div key={teamName} className="mb-4">
                    <h4 className="font-semibold text-gray-800">- {teamName}</h4>
                    <p className="text-gray-600">
                      {players.map(player => `${player.name} (${title === 'Thẻ đỏ' ? player.red_cards : player.yellow_cards} thẻ)`).join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <span>Không có</span>
            )
          }
        </div>
      );
    }

    return (
      <div className={`p-6 rounded-lg shadow-lg border ${colorClass} mb-4`}>
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon={icon} className={`text-3xl mr-4 ${colorClass}`} />
          <h3 className="text-2xl font-semibold">{title}</h3>
        </div>
        <p className="text-lg font-medium text-gray-700">{value}</p>
        <p className="bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-mpRegular text-lg">
          {description}
        </p>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 max-w-4xl">
      {/* Award Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Giải thưởng</h2>
        {playerStats.prizes.map((prize) => {
          const colorClass = getColorClass(prize.tag);
          const icon = getIcon(prize.tag);
          return (
            <div key={prize.tag}>
              {renderCard(
                prize.prize_name,
                `${prize.value.toLocaleString()}`,
                prize.player_name 
                  ? `${prize.player_name} `
                  : prize.team_name 
                  ? `${prize.team_name} `
                  : 'Đang cập nhật...',
                icon,
                colorClass
              )}
            </div>
          );
        })}
      </div>

      {/* Disciplinary Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Kỷ luật</h2>
        {renderCard(
          'Thẻ đỏ',
          '100.000 VNĐ',
          '',
          faSquare,
          'border-red-500 text-red-500',
          true,
          playerStats.redCards
        )}
        {renderCard(
          'Thẻ vàng',
          '50.000 VNĐ',
          '',
          faSquare,
          'border-yellow-500 text-yellow-500',
          true,
          playerStats.yellowCards
        )}
      </div>
    </div>
  );
};

export default Results;