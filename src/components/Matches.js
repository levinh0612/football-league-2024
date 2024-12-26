import React, { useEffect, useState } from "react";
import axios from "axios";
import formatDate from '../utils/formatDate';
import PasswordModal from "./PasswordModal";
import DeclareMatchModal from "./DeclareMatchModal";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickCounts, setClickCounts] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [declareModalOpen, setDeclareModalOpen] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/match`
        );
        setMatches(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchMatches();
  }, []);

  const handleClick = (matchId) => {
    setClickCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      newCounts[matchId] = (newCounts[matchId] || 0) + 1;
  
      if (newCounts[matchId] === 3) {
        setSelectedMatch(matches.find(item => item.id === matchId));
        setModalOpen(true);
        resetCount();
      }
  
      return newCounts;
    });  
  };

  const resetCount = () => {
    setClickCounts(0);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMatch(null);
  };

  const handleSubmitPassword = (isValidPassword) => {
    if (isValidPassword) {
      setModalOpen(false);
      setDeclareModalOpen(true); // Open the match declaration modal
    }
  };

  const handleCloseDeclareModal = () => {
    setDeclareModalOpen(false);
    setSelectedMatch(null);
  };

  const handleSubmitDetails = async (matchDetails) => {
    console.log("Match details declared for match:", matchDetails);

    try {
      // Sending a PUT request to update the match details
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/match/${matchDetails.matchId}`,
        matchDetails  // This is the matchDetails object containing score and events
      );

      if (response.status === 200) {
        alert("Match details updated successfully!");
        setDeclareModalOpen(false);
        setSelectedMatch(null);

        // Refetch the matches after successfully updating the details
        await fetchMatches();
      } else {
        alert("Failed to update match details.");
      }
    } catch (error) {
      console.error("Error updating match details:", error);
      alert("An error occurred while updating match details.");
    }
  };

  const fetchMatches = async () => {
    try {
      setLoading(true); // Start loading again to refresh the matches
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/match`
      );
      setMatches(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      {matches && matches.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {matches.map(({ id, date, home_score, away_score, home_team, away_team }) => (
              <div
                key={id}
                className="p-6 border-2 border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white cursor-pointer"
                onClick={() => handleClick(id)}
              >
                <p className="text-lg font-medium text-gray-800 mb-2">{formatDate(date)}</p>
                <p className="text-xl font-semibold mb-4 text-center">
                  <span className={`${home_score > away_score ? 'text-yellow-500' : 'text-black'}`}>
                    {home_team} 
                  </span>
                  <span className="font-normal mx-2">vs</span> 
                  <span
                    className={`${away_score > home_score ? 'text-yellow-500' : 'text-black'} `}
                  >
                    {away_team}
                  </span>
                </p>
                <p className="text-2xl font-bold text-center">
                  <span
                    className={`score p-1 rounded-md mr-1 ${home_score > away_score ? 'bg-yellow-500' : 'bg-black'} text-white`}
                  >
                    {home_score}
                  </span>
                  :
                  <span
                    className={`score p-1 rounded-md ml-1 ${away_score > home_score ? 'bg-yellow-500' : 'bg-black'} text-white`}
                  >
                    {away_score}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal for Password */}
      <PasswordModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitPassword}
      />

      {/* Modal for Declaring Match Details */}
      {
        declareModalOpen  && (
          <DeclareMatchModal
            isOpen={declareModalOpen}
            onClose={handleCloseDeclareModal}
            match={selectedMatch}
            onSubmitDetails={handleSubmitDetails}
          />
        )
      }

    </div>
  );
};

export default Matches;