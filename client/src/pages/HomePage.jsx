import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { FaPlus, FaArrowRight, FaDesktop } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');

  const createAndJoin = () => {
    const newRoomId = uuidV4();
    navigate(`/room/${newRoomId}`);
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (roomId.trim() === '') return;
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center pt-24 sm:pt-32 px-4">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-10">
          <FaDesktop size={48} className="mx-auto mb-4 text-gray-800" />
          <h1 className="text-5xl font-bold">
            Collaborative Whiteboard
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Join an existing board or create a new one to start sketching.
          </p>
        </header>
        <main className="space-y-4">
          <form onSubmit={joinRoom} className="flex justify-center items-center gap-3">
            <input
              id="roomId"
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter Room Code"
              className="w-64 px-3 py-2 border border-gray-500 bg-white text-black focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              type="submit"
              disabled={!roomId}
              className="px-4 py-2 bg-gray-100 border border-gray-500 text-black font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:text-gray-400 disabled:bg-gray-50"
            >
              <span>Join with Code</span>
              <FaArrowRight />
            </button>
          </form>
          <div className="text-center font-bold text-gray-500">
            OR
          </div>
          <div className="flex justify-center">
            <button
              onClick={createAndJoin}
              className="px-4 py-2 bg-gray-100 border border-gray-500 text-black font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <FaPlus />
              <span>Create a New Board</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;