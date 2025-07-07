const OptionsBar = ({ tool, onColorChange, selectedColor, strokeWidth, onWidthChange }) => {
  const showColorPicker = tool === 'pen';
  const showStrokeWidth = tool === 'pen' || tool === 'eraser';
  
  const presetColors = ['#000000', '#ef4444', '#22c55e', '#3b82f6', '#eab308', '#a855f7', '#abcdef'];

  if (!showColorPicker && !showStrokeWidth) {
    return <div className="h-24" />;
  }

  return (
    <div className="flex items-center justify-center gap-6 py-4 px-4">
      
      {showColorPicker && (
        <div className="flex items-center gap-2">
          {presetColors.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              aria-label={`Select color ${color}`}
              className={`
                transition-all duration-150 rounded-full w-10 h-10 border-2
                ${color === '#ffffff' ? 'ring-1 ring-inset ring-gray-300' : ''}
                ${selectedColor === color
                  ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-white border-transparent'
                  : 'hover:scale-105'
                }
              `}
              style={{ 
                backgroundColor: color,
                width: '24px',      
                height: '24px',    
                minWidth: '24px',
                minHeight: '24px',
               }}
            />
          ))}
        </div>
      )}

      {showColorPicker && showStrokeWidth && <div className="w-px h-20 bg-gray-100" />}
      
      {showStrokeWidth && (
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="50"
            value={strokeWidth}
            onChange={(e) => onWidthChange(Number(e.target.value))}
            className="custom-slider"
          />
          <span className="text-base font-semibold text-center bg-gray-200 text-gray-800 rounded-md py-1">
            {strokeWidth}
          </span>
        </div>
      )}
    </div>
  );
};

export default OptionsBar;