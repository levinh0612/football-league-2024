import React, { useEffect, useState } from "react";
import formatDate from "../utils/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol, faSquare } from "@fortawesome/free-solid-svg-icons";

const DetailModal = ({ isOpen, onClose, match }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && match) {
      const fetchStats = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/match/${match.id}`
          );
          const data = await response.json();
          setStats(data);
        } catch (err) {
          setError("Failed to load match details.");
        } finally {
          setLoading(false);
        }
      };

      fetchStats();
    }
  }, [isOpen, match]);

  if (!isOpen || !match) return null;

  const renderPlayerStats = (teamName, players) => (
    <>
      <h3 className="font-semibold mt-4">{teamName}:</h3>
      <div className="ml-3">
        {players.map((player, index) => (
          <p key={index} className="flex items-center">
            <span className="mr-2 max-w-40 w-40">{player.player_name}:</span>
            <span>{player.goals}</span>
            <FontAwesomeIcon icon={faFutbol} className="text-blue-500 ml-2 mr-4" />
            <span>{player.yellow_cards}</span>
            <FontAwesomeIcon icon={faSquare} className="text-yellow-500 ml-2 mr-4" />
            <span>{player.red_cards}</span>
            <FontAwesomeIcon icon={faSquare} className="text-red-500 ml-2 mr-4" />
          </p>
        ))}
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
    
        <p className="text-2xl font-bold text-center">
          <span
            className={`pr-2 ${
              match.home_score > match.away_score ? "text-yellow-500" : "text-black"
            }`}
          >
            {match.home_team}
          </span>
          <span
            className={`score p-1 rounded-md mx-1 ${
              match.home_score > match.away_score ? "bg-yellow-500" : "bg-black"
            } text-white`}
          >
            {match.home_score}
          </span>
          :
          <span
            className={`score p-1 rounded-md mx-1 ${
              match.away_score > match.home_score ? "bg-yellow-500" : "bg-black"
            } text-white`}
          >
            {match.away_score}
          </span>
          <span
            className={`pl-2 ${
              match.home_score < match.away_score ? "text-yellow-500" : "text-black"
            }`}
          >
            {match.away_team}
          </span>
        </p>

        <p className="mt-4">
          <strong>Thời gian:</strong> {formatDate(match.date)}
        </p>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {renderPlayerStats(match.home_team, stats.home_team_stats)}
            {renderPlayerStats(match.away_team, stats.away_team_stats)}
          </>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;