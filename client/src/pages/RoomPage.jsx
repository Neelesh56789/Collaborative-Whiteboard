import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { socket } from '../socket';
import Board from '../components/Board';
import Toolbar from '../components/Toolbar';
import HeaderControls from '../components/HeaderControls';

const SERVER_URL = "http://localhost:3001";

const RoomPage = () => {
  const { roomId } = useParams();
  const boardRef = useRef(null);
  
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(5);

  useEffect(() => {
    socket.connect();
    socket.emit("join_room", roomId);
    return () => { socket.disconnect(); };
  }, [roomId]);

  useEffect(() => {
    const loadBoard = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/board/${roomId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.content) boardRef.current?.loadCanvasFromDataURL(data.content);
        }
      } catch (error) { console.error("Failed to load board state:", error); }
    };
    setTimeout(loadBoard, 500);
  }, [roomId]);

  const handleClear = () => boardRef.current?.clearCanvas();

  const handleSave = async () => {
    const content = boardRef.current?.getCanvasAsDataURL();
    if (!content) return alert('Could not get board content.');
    try {
      const res = await fetch(`${SERVER_URL}/api/board`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, content }),
      });
      if (res.ok) alert('Board saved successfully!');
      else alert(`Failed to save board: ${res.statusText}`);
    } catch (error) { 
      console.error("Save error:", error);
      alert('Failed to save board. Check console for details.'); 
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-100">
      <header className="flex-shrink-0 w-full p-2 bg-white text-gray-800 flex items-center justify-between z-20 shadow-md">
        <Link to="/" className="w-24 text-center px-3 py-1.5 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md text-sm font-semibold transition-colors">
          Back
        </Link>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-bold">Collaborative Whiteboard</h1>
          <HeaderControls
            strokeWidth={strokeWidth}
            onWidthChange={setStrokeWidth}
          />
        </div>
        <button onClick={handleSave} className="w-24 text-center px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-sm font-semibold transition-colors">
          Save
        </button>
      </header>
      
      <div className="flex-grow w-full flex p-4">
        <aside className="flex-shrink-0 z-10">
          <Toolbar
            tool={tool}
            onToolChange={setTool}
            onClear={handleClear}
            color={color}
            onColorChange={setColor}
          />
        </aside>

        <main className="flex-grow w-full h-full ml-4 bg-white rounded-xl shadow-lg">
          <Board ref={boardRef} roomId={roomId} tool={tool} color={color} strokeWidth={strokeWidth} />
        </main>
      </div>
    </div>
  );
};

export default RoomPage;