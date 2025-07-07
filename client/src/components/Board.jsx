import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { socket } from '../socket';

const Board = forwardRef(({ roomId, tool, color, strokeWidth }, ref) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPosition = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    const context = canvas.getContext('2d');
    contextRef.current = context;

    const handleDrawing = (data) => {
      const { x0, y0, x1, y1, color, strokeWidth, tool } = data;
      const ctx = contextRef.current;
      if (!ctx) return;
      const originalCompositeOperation = ctx.globalCompositeOperation;
      const originalStrokeStyle = ctx.strokeStyle;
      const originalLineWidth = ctx.lineWidth;

      if (tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
      } else {
        ctx.globalCompositeOperation = 'source-over';
      }
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.closePath();
      ctx.globalCompositeOperation = originalCompositeOperation;
      ctx.strokeStyle = originalStrokeStyle;
      ctx.lineWidth = originalLineWidth;
    };

    const handleClear = () => {
      contextRef.current?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    socket.on('drawing', handleDrawing);
    socket.on('clear', handleClear);

    return () => {
      socket.off('drawing', handleDrawing);
      socket.off('clear', handleClear);
    };
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.strokeStyle = color;
    contextRef.current.lineWidth = strokeWidth;
    contextRef.current.lineCap = 'round';
    if (tool === 'eraser') {
      contextRef.current.globalCompositeOperation = 'destination-out';
    } else {
      contextRef.current.globalCompositeOperation = 'source-over';
    }
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    lastPosition.current = { x: offsetX, y: offsetY };
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const { x: lastX, y: lastY } = lastPosition.current;
    const drawingData = { x0: lastX, y0: lastY, x1: offsetX, y1: offsetY, color, strokeWidth, tool, roomId };
    
    socket.emit('drawing', drawingData);
    
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    lastPosition.current = { x: offsetX, y: offsetY };
  };

  useImperativeHandle(ref, () => ({
    clearCanvas() {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      socket.emit('clear', { roomId });
    },
    getCanvasAsDataURL: () => canvasRef.current.toDataURL('image/png'),
    loadCanvasFromDataURL: (dataUrl) => {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        contextRef.current.drawImage(img, 0, 0);
      };
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      onMouseLeave={finishDrawing}
      className="w-full h-full bg-white rounded-lg shadow-inner"
    />
  );
});

Board.displayName = 'Board';
export default Board;