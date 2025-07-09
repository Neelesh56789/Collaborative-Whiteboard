import React, { useState } from 'react';
import { SketchPicker } from 'react-color'; 

const OptionsBar = ({ tool, onColorChange, selectedColor, strokeWidth, onWidthChange }) => {
  const showColorPicker = tool === 'pen' || tool === 'rectangle' || tool === 'circle';
  const showStrokeWidth = tool === 'pen' || tool === 'eraser' || tool === 'rectangle' || tool === 'circle';
  
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };
  
  const popover = {
    position: 'absolute',
    zIndex: '2',
    top: '50px', 
    right: '0px',
  };
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  };


  if (!showColorPicker && !showStrokeWidth) {
    return <div className="h-12" />; 
  }

  return (
    <div className="flex items-center justify-center gap-6 py-2 px-4 relative">
      
      {showColorPicker && (
         <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-white">Color</span>
            <div className='relative'>
              <button
                onClick={handleClick}
                className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: selectedColor }}
                aria-label="Select color"
              />
              {displayColorPicker ? (
                <div style={popover}>
                  <div style={cover} onClick={handleClose} />
                  <SketchPicker
                    color={selectedColor}
                    onChange={(color) => onColorChange(color.hex)}
                  />
                </div>
              ) : null}
            </div>
        </div>
      )}

      {showColorPicker && showStrokeWidth && <div className="w-px h-10 bg-gray-500" />}
      
      {showStrokeWidth && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-white">
            {tool === 'eraser' ? 'Eraser Size' : 'Stroke'}
          </span>
          <input
            type="range"
            min="1"
            max="50"
            value={strokeWidth}
            onChange={(e) => onWidthChange(Number(e.target.value))}
            className="custom-slider"
          />
          <span className="text-base font-semibold text-center bg-gray-200 text-gray-800 rounded-md py-1 px-3 w-12">
            {strokeWidth}
          </span>
        </div>
      )}
    </div>
  );
};

export default OptionsBar;