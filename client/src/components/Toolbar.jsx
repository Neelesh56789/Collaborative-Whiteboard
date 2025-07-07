import { FaPen, FaEraser, FaTrash } from 'react-icons/fa';

const ToolButton = ({ title, onClick, active, children }) => (
  <button
    onClick={onClick}
    className={`p-4 rounded-xl transition-colors w-full flex items-center justify-center
      ${active ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'}
    `}
    title={title}
  >
    {children}
  </button>
);

const Toolbar = ({ tool, onToolChange, onClear }) => {
  return (
    <div className="bg-white p-2 rounded-lg shadow-xl flex flex-col items-center gap-2 border border-gray-200">
      <ToolButton title="Pen" onClick={() => onToolChange('pen')} active={tool === 'pen'}>
        <FaPen size={20} />
      </ToolButton>
      <ToolButton title="Eraser" onClick={() => onToolChange('eraser')} active={tool === 'eraser'}>
        <FaEraser size={20} />
      </ToolButton>
      <div className="w-full h-px bg-gray-300 my-1" />
      <ToolButton title="Clear All" onClick={onClear}>
        <FaTrash size={20} />
      </ToolButton>
    </div>
  );
};

export default Toolbar;