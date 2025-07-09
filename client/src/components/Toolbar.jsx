import React, { useState, useRef, useEffect } from 'react';
import { FaPen, FaEraser, FaTrash, FaRegCircle, FaRegSquare, FaSlash, FaShapes } from 'react-icons/fa';
import { FiTriangle } from 'react-icons/fi';

const ToolButton = ({ title, onClick, active, children }) => (
  <button
    onClick={onClick}
    className={`p-3 w-12 h-12 flex items-center justify-center rounded-lg transition-colors
      ${active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
    `}
    title={title}
  >
    {children}
  </button>
);

const Toolbar = ({ tool, onToolChange, onClear, color, onColorChange }) => {
  const [showShapes, setShowShapes] = useState(false);
  const toolbarRef = useRef(null);

  const shapeTools = ['rectangle', 'circle', 'triangle', 'line'];
  const isShapeActive = shapeTools.includes(tool);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target)) {
        setShowShapes(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={toolbarRef} className="bg-white p-2 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center gap-2">
      <ToolButton title="Pen" onClick={() => onToolChange('pen')} active={tool === 'pen'}><FaPen size={20} /></ToolButton>
      <ToolButton title="Eraser" onClick={() => onToolChange('eraser')} active={tool === 'eraser'}><FaEraser size={20} /></ToolButton>
      
      <div className="relative">
        <ToolButton title="Shapes" onClick={() => setShowShapes(!showShapes)} active={isShapeActive}><FaShapes size={20} /></ToolButton>
        {showShapes && (
          <div className="absolute left-full top-0 ml-2 bg-white p-2 rounded-lg shadow-lg border flex flex-col gap-2 z-20">
            <ToolButton title="Line" onClick={() => onToolChange('line')} active={tool === 'line'}><FaSlash size={20} /></ToolButton>
            <ToolButton title="Rectangle" onClick={() => onToolChange('rectangle')} active={tool === 'rectangle'}><FaRegSquare size={20} /></ToolButton>
            <ToolButton title="Circle" onClick={() => onToolChange('circle')} active={tool === 'circle'}><FaRegCircle size={20} /></ToolButton>
            <ToolButton title="Triangle" onClick={() => onToolChange('triangle')} active={tool === 'triangle'}><FiTriangle size={20} /></ToolButton>
          </div>
        )}
      </div>
      
      <ToolButton title="Clear Canvas" onClick={onClear}><FaTrash size={20} /></ToolButton>
      
      <div className="w-full h-px bg-gray-300 my-1" />

      <input
        type="color"
        value={color}
        onChange={(e) => onColorChange(e.target.value)}
        className="w-10 h-10 p-1 rounded-md border-2 border-gray-200 cursor-pointer"
        title="Select Color"
      />
    </div>
  );
};

export default Toolbar;