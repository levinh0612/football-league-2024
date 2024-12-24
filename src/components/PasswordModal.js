import React, {  useState, useEffect } from "react";


// Modal for password entry
const PasswordModal = ({ isOpen, onClose, onSubmit }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setPassword("");
  }, [])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password) {
      if (password === process.env.REACT_APP_PASSWORD) {
        onSubmit(true); // Password correct
        setPassword("");
        setError("");
      } else {
        setPassword("");
        setError("Invalid password. Please try again.");
      }
    } else {
      setError("Please enter a password.");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Enter Password to Declare Match</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Enter password"
              required
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={ () => {
                    setError("");
                    setPassword("");
                    onClose();
                  }
                }
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

export default PasswordModal;