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
    <div className="p-4">
      {leaderboard && leaderboard.length > 0 && (
        <>
          <h2 className="text-3xl font-bold mb-6 text-center">Bảng Xếp Hạng</h2>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              {/* <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Hạng</th>
                <th className="py-2 px-4 text-left">Đội</th>
                <th className="py-2 px-4 text-left">Trận Thắng</th>
                <th className="py-2 px-4 text-left">Trận Hòa</th>
                <th className="py-2 px-4 text-left">Trận Thua</th>
                <th className="py-2 px-4 text-left">Hiệu Số Bàn Thắng</th>
                <th className="py-2 px-4 text-left">Hiệu Số Bàn Thua</th>
                <th className="py-2 px-4 text-left">Điểm</th>
              </tr> */}
              <tr>
                <th className="hidden" aria-hidden="true"></th>
                <th className="font-bold text-center" scope="col">
                  <div>Rank</div>
                </th>
                <th className="font-bold text-center" scope="col">
                  <div>Câu lạc bộ</div>
                </th>
                <th
                  className="font-bold text-center w-[25px] min-w-[25px]"
                  scope="col"
                >
                  <div>
                    <span aria-hidden="true">ĐĐ</span>
                    <span className="hidden">Số trận đã chơi</span>
                  </div>
                </th>
                <th
                  className="font-bold text-center w-[25px] min-w-[25px]"
                  scope="col"
                >
                  <div>
                    <span aria-hidden="true">Thắng</span>
                    <span className="hidden">Số trận thắng</span>
                  </div>
                </th>
                <th
                  className="font-bold text-center w-[25px] min-w-[25px]"
                  scope="col"
                >
                  <div>
                    <span aria-hidden="true">H</span>
                    <span className="hidden">Số trận hòa</span>
                  </div>
                </th>
                <th
                  className="font-bold text-center w-[25px] min-w-[25px]"
                  scope="col"
                >
                  <div>
                    <span aria-hidden="true">Thua</span>
                    <span className="hidden">Số trận thua</span>
                  </div>
                </th>
                <th
                  className="font-bold text-center w-[25px] min-w-[25px]"
                  scope="col"
                >
                  <div>
                    <span aria-hidden="true">BT</span>
                    <span className="hidden">Bàn thắng</span>
                  </div>
                </th>
                <th
                  className="font-bold text-center w-[25px] min-w-[25px]"
                  scope="col"
                >
                  <div>
                    <span aria-hidden="true">SBT</span>
                    <span className="hidden">Số bàn thua</span>
                  </div>
                </th>
                <th
                  className="font-bold text-center w-[25px] min-w-[25px]"
                  scope="col"
                >
                  <div>
                    <span aria-hidden="true">HS</span>
                    <span className="hidden">Hiệu số bàn thắng</span>
                  </div>
                </th>
                <th
                  className="font-bold text-center w-[25px] min-w-[25px]"
                  scope="col"
                >
                  <div>
                    <span aria-hidden="true">Đ</span>
                    <span className="hidden">Điểm</span>
                  </div>
                </th>
                <th
                  className="font-bold text-center w-[100px] min-w-[100px]"
                  scope="col"
                >
                  <div>
                    <span aria-hidden="true">KQ</span>
                    <span className="hidden">5 trận đấu gần đây nhất</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((team, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{team.rank}</td>
                  <td className="border border-gray-300 px-4 py-2">{team.teamName}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{team.matchesPlayed}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{team.wins}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{team.draws}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{team.losses}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{team.goalsFor}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{team.goalsAgainst}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{team.goalDifference}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{team.points}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center space-x-1">
                      {team.recentResults.map((result, i) => (
                        <span
                          key={i}
                          className={`w-6 h-6 flex items-center justify-center rounded-full ${result === "W"
                              ? "bg-green-500 text-white"
                              : result === "D"
                                ? "bg-yellow-500 text-white"
                                : "bg-red-500 text-white"
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
        </>
      )}
    </div>
  );
};

export default Ranking;