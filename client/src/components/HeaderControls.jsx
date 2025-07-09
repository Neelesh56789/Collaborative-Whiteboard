const HeaderControls = ({ strokeWidth, onWidthChange }) => {
  return (
    <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-lg">
      <input
        type="range"
        min="1"
        max="100"
        value={strokeWidth}
        onChange={(e) => onWidthChange(Number(e.target.value))}
        className="w-48 accent-blue-500"
        title="Stroke Size"
      />
      <span className="font-mono text-gray-800 w-12 text-center">{strokeWidth}px</span>
    </div>
  );
};

export default HeaderControls;