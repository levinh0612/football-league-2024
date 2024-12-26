import React, { useEffect, useState } from "react";
import axios from "axios";

const Ranking = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/team/leaderboard`
        );
        setLeaderboard(response.data);
      } catch (err) {
        setError("Failed to load leaderboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 font-semibold">{error}</div>;
  }

  return (
    <div className="sm:p-2">
      {leaderboard && leaderboard.length > 0 && (
        <>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Bảng Xếp Hạng</h2>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full table-auto text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-800 text-white">
                <div className="border bg-gray-800 sticky left-0 z-20 truncate">
                  <th className="py-2 px-4 text-center left-0 bg-gray-800 z-10">#</th>
                  <th className="py-2 px-4 text-center left-16 bg-gray-800 z-10">CLB</th>
                  </div>
                  <th className="py-2 px-4 text-center">ĐĐ</th>
                  <th className="py-2 px-4 text-center">W</th>
                  <th className="py-2 px-4 text-center">D</th>
                  <th className="py-2 px-4 text-center">L</th>
                  <th className="py-2 px-4 text-center">BT</th>
                  <th className="py-2 px-4 text-center">SBT</th>
                  <th className="py-2 px-4 text-center">HS</th>
                  <th className="py-2 px-4 text-center">Đ</th>
                  <th className="py-2 px-4 text-center">KQ</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((team, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b">
                    <div className={`border bg-white sticky left-0 z-20 truncate ${index < 2 ? 'border-l-yellow-200 border-l-4' : ''}`}>
                      <td className=" px-4 py-2 text-center bg-white ">{team.rank}</td>
                      <td className=" px-4 py-2 text-center bg-white border-0 ">{team.teamName}</td>
                    </div>
                    <td className="border px-4 py-2 text-center">{team.matchesPlayed}</td>
                    <td className="border px-4 py-2 text-center">{team.wins}</td>
                    <td className="border px-4 py-2 text-center">{team.draws}</td>
                    <td className="border px-4 py-2 text-center">{team.losses}</td>
                    <td className="border px-4 py-2 text-center">{team.goalsFor}</td>
                    <td className="border px-4 py-2 text-center">{team.goalsAgainst}</td>
                    <td className="border px-4 py-2 text-center">{team.goalDifference}</td>
                    <td className="border px-4 py-2 text-center">{team.points}</td>
                    <td className="border px-4 py-2 text-center">
                      <div className="flex justify-center space-x-1">
                        {team.recentResults && team.recentResults.map((result, i) => (
                          <span
                            key={i}
                            className={`w-6 h-6 flex items-center justify-center rounded-full ${
                              result === "W"
                                ? "bg-green-500 text-white"
                                : result === "D"
                                ? "bg-yellow-500 text-white"
                                : result === "L"
                                ? "bg-red-500 text-white"
                                : "bg-gray-300 text-gray-800"
                            }`}
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Ranking;