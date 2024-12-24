import React, { useEffect, useState } from "react";
import axios from "axios";
import formatDate from "../utils/formatDate";

// Autocomplete data for events (this can be fetched from an API as well)
const events = [
  { id: 1, name: "Goal" },
  { id: 2, name: "Yellow Card" },
  { id: 3, name: "Red Card" },
  // Add more event types as needed
];

const DeclareMatchModal = ({
  isOpen,
  onClose,
  match,
  onSubmitDetails,
}) => {

  const homeTeam = { name: match?.home_team, id: match?.home_id };
  const awayTeam = { name: match?.away_team, id: match?.away_id };
  const date = match?.date;

  const [homeScore, setHomeScore] = useState("0");
  const [awayScore, setAwayScore] = useState("0");
  const [eventList, setEventList] = useState([]);
  const [homePlayer, setHomePlayer] = useState("");
  const [awayPlayer, setAwayPlayer] = useState("");
  const [eventType, setEventType] = useState("Goal");
  const [eventCount, setEventCount] = useState(1);
  const [homePlayers, setHomePlayers] = useState([]); // List of home team players
  const [awayPlayers, setAwayPlayers] = useState([]); // List of away team players


  // Fetch players for both home and away teams
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // Fetch home team players
        const homeResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/team/players/${homeTeam.id}`);
        setHomePlayers(homeResponse.data); // Store home team players

        // Fetch away team players
        const awayResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/team/players/${awayTeam.id}`);
        setAwayPlayers(awayResponse.data); // Store away team players
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, [homeTeam.id, awayTeam.id]);

  const handleAddEvent = () => {
    if ((homePlayer || awayPlayer) && eventType) {
      // Check if the same event with the same players already exists in the event list
      const existingEventIndex = eventList.findIndex(
        (event) =>
          event.homePlayer === homePlayer &&
          event.awayPlayer === awayPlayer &&
          event.eventType === eventType
      );
  
      if (existingEventIndex !== -1) {
        // If the event already exists, increment the eventCount
        const updatedEventList = [...eventList];
        updatedEventList[existingEventIndex].eventCount += parseInt(eventCount);
        setEventList(updatedEventList);
      } else {
        // If the event is new, add it to the list
        const newEvent = {
          homePlayer: homePlayer, // Store only player name or ID
          awayPlayer: awayPlayer, // Store only player name or ID
          eventType,
          eventCount,
        };
  
        setEventList([...eventList, newEvent]);
      }
  
      // Update score if it's a Goal
      if (eventType === "Goal") {
        if (homePlayer) {
          setHomeScore((prevScore) => (parseInt(prevScore) + parseInt(eventCount)).toString());
        }
        if (awayPlayer) {
          setAwayScore((prevScore) => (parseInt(prevScore) + parseInt(eventCount)).toString());
        }
      }
  
      // Reset fields after adding the event
      setHomePlayer("");
      setAwayPlayer("");
      setEventCount(1);
    }
  };

  // Remove an event from the list
  const handleRemoveEvent = (index) => {
    const updatedEventList = eventList.filter((_, i) => i !== index);
    setEventList(updatedEventList);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (homeScore && awayScore && eventList.length > 0) {
      const matchData = {
        matchId: match.id,
        homeScore,
        awayScore,
        events: eventList
      };
      onSubmitDetails(matchData); // Pass match data to the parent component
      onClose();
    } else {
      alert("Please fill in all details.");
    }
  };

  const findNameById =(id, list) => {
    const rs = list.find(item => item.id == id);
    return `${rs?.name} (${rs?.jersey_number})`;
  }

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4 max-h-[700px] overflow-auto">
          <h2 className="text-xl font-bold mb-4">Declare Match Details</h2>
          <form onSubmit={handleSubmit}>
            {/* Pre-fill match details */}
            <p className="font-semibold text-lg mb-4">{formatDate(date)}</p>

            <p className="font-semibold text-lg mb-2">{homeTeam.name} vs {awayTeam.name}</p>

            {/* Home Team Score */}
            <div className="flex items-center mb-4">
              <input
                type="number"
                value={homeScore}
                onChange={(e) => {
                  const score = e.target.value;
                  setHomeScore(score > 0 ? score : 0);
                }}
                className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-sm mr-2"
                required
              />
              <p className="mx-1"> : </p>

              {/* Away Team Score */}
              <input
                type="number"
                value={awayScore}
                onChange={(e) => {
                  const score = e.target.value;
                  setAwayScore(score > 0 ? score : 0);
                }}
                className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-sm"
                required
              />
            </div>

            <h3 className="font-semibold text-lg mt-4 mb-2">Sự kiện:</h3>

            <div className="mb-4">
              {/* Autocomplete for Home Player */}
              <label className="block mb-2">{homeTeam.name}</label>
              <select
                value={homePlayer}
                disabled={awayPlayer}
                onChange={(e) => {
                  if (!awayPlayer) setHomePlayer(e.target.value)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              >
                <option value="">Chọn cầu thủ của {homeTeam.name}</option>
                {homePlayers.map(({id, name, jersey_number}) => (
                  <option key={id} value={id}>
                    {`${jersey_number} | ${name}`}
                  </option>
                ))}
              </select>

              {/* Autocomplete for Away Player */}
              <label className="block mb-2">{awayTeam.name}</label>
              <select
                value={awayPlayer}
                disabled={homePlayer}
                onChange={(e) => {
                  if (!homePlayer) setAwayPlayer(e.target.value)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              >
                <option value="">Chọn cầu thủ của {awayTeam.name}</option>
                {awayPlayers.map(({id, name, jersey_number}) => (
                  <option key={id} value={id}>
                    {`${jersey_number} | ${name}`}
                  </option>
                ))}
              </select>

              <div className="flex items-center mb-4">
                {/* Event Type */}
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-40 px-4 py-2 border border-gray-300 rounded-lg mr-4"
                >
                  <option value="">Select Event Type</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.name}>
                      {event.name}
                    </option>
                  ))}
                </select>

                {/* Event Count */}
                <input
                  type="number"
                  value={eventCount}
                  onChange={(e) => setEventCount(e.target.value)}
                  className="w-16 px-4 py-2 border border-gray-300 rounded-lg"
                  min="1"
                  required
                />
              </div>

              {/* Add Event Button */}
              <button
                type="button"
                onClick={handleAddEvent}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
              >
                Add Event
              </button>
            </div>

            {/* Event List */}
            <h3 className="font-semibold text-lg mt-4 mb-2">Xem trước: </h3>
            <ul>
            {eventList.map((event, index) => (
              <li
                key={index}
                className={`flex justify-between items-center mb-2 w-full ${event.homePlayer ? 'text-left' : 'text-right'}`}
              >
                <span>{index +1 + "|  "} </span>
                <span className={`flex items-center w-full ${event.homePlayer ? 'text-left' : 'text-right'}`}>
                  <p className={`mr-2 ${event.homePlayer ? 'text-left' : 'text-right'} w-full`}>
                    {/* Display only the player involved in the event */}
                    {event.homePlayer ? findNameById(event.homePlayer, homePlayers) : findNameById(event.awayPlayer, awayPlayers)} ({event.eventType} x{event.eventCount})
                  </p>
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveEvent(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
            </ul>

            {/* Submit and Close Buttons */}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default DeclareMatchModal;