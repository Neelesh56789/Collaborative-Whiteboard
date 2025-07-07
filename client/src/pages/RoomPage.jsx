import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { socket } from '../socket';
import Board from '../components/Board';
import Toolbar from '../components/Toolbar';
import OptionsBar from '../components/OptionsBar';

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
    if (!content) return;
    try {
      await fetch(`${SERVER_URL}/api/board`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, content }),
      });
      alert('Board saved!');
    } catch (error) { alert('Failed to save board.'); }
  };

  return (
    <div className="h-screen w-full bg-gray-100 relative overflow-hidden flex flex-col">
      
      <header className="flex-shrink-0 w-full p-4 bg-gray-800 text-white flex items-center justify-between z-20 shadow-lg">
        <Link to="/" className="px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 rounded-lg text-sm font-semibold transition-colors shadow-md">Back</Link>
        <OptionsBar
          tool={tool}
          selectedColor={color}
          onColorChange={setColor}
          strokeWidth={strokeWidth}
          onWidthChange={setStrokeWidth}
        />
        <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-semibold transition-colors shadow-md">Save</button>
      </header>
      
      <div className="flex flex-grow items-center">
        
        <aside className="flex-shrink-0 p-4 bg-white border-gray-200">
          <Toolbar tool={tool} onToolChange={setTool} onClear={handleClear} />
        </aside>

        <main className="flex-grow p-4 h-full">
          <Board ref={boardRef} roomId={roomId} tool={tool} color={color} strokeWidth={strokeWidth} />
        </main>
      </div>
    </div>
  );
};

export default RoomPage;