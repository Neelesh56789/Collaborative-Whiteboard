import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { socket } from '../socket';

const SHAPE_TOOLS = ['rectangle', 'circle', 'triangle', 'line'];

const Board = forwardRef(({ roomId, tool, color, strokeWidth }, ref) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const drawingStartPos = useRef({ x: 0, y: 0 });
  const snapshotRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    const context = canvas.getContext('2d');
    contextRef.current = context;

    const handleDrawing = (data) => {
      drawOnCanvas(contextRef.current, data);
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

  const drawOnCanvas = (ctx, data) => {
    if (!ctx) return;
    const { x0, y0, x1, y1, color, strokeWidth, tool } = data;
    const originalCompositeOperation = ctx.globalCompositeOperation;
    const originalStrokeStyle = ctx.strokeStyle;
    const originalLineWidth = ctx.lineWidth;

    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }

    switch (tool) {
      case 'pen':
      case 'eraser':
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        break;
      case 'rectangle':
        ctx.beginPath();
        ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
        break;
      case 'circle':
        const radius = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)) / 2;
        const centerX = x0 + (x1 - x0) / 2;
        const centerY = y0 + (y1 - y0) / 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(x0 + (x1 - x0) / 2, y0);
        ctx.lineTo(x0, y1);
        ctx.lineTo(x1, y1);
        ctx.closePath();
        ctx.stroke();
        break;
      case 'line':
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        break;
      default:
        break;
    }

    ctx.globalCompositeOperation = originalCompositeOperation;
    ctx.strokeStyle = originalStrokeStyle;
    ctx.lineWidth = originalLineWidth;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    drawingStartPos.current = { x: offsetX, y: offsetY };
    if (SHAPE_TOOLS.includes(tool)) {
      snapshotRef.current = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const finishDrawing = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    if (SHAPE_TOOLS.includes(tool)) {
      if (snapshotRef.current) {
        contextRef.current.putImageData(snapshotRef.current, 0, 0);
      }
      const drawingData = { x0: drawingStartPos.current.x, y0: drawingStartPos.current.y, x1: offsetX, y1: offsetY, color, strokeWidth, tool, roomId };
      drawOnCanvas(contextRef.current, drawingData);
      socket.emit('drawing', drawingData);
    }
    setIsDrawing(false);
    snapshotRef.current = null;
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    if (tool === 'pen' || tool === 'eraser') {
      const penData = { x0: drawingStartPos.current.x, y0: drawingStartPos.current.y, x1: offsetX, y1: offsetY, color, strokeWidth, tool, roomId };
      drawOnCanvas(contextRef.current, penData);
      socket.emit('drawing', penData);
      drawingStartPos.current = { x: offsetX, y: offsetY };
    } else if (SHAPE_TOOLS.includes(tool) && snapshotRef.current) {
      contextRef.current.putImageData(snapshotRef.current, 0, 0);
      const shapeData = { x0: drawingStartPos.current.x, y0: drawingStartPos.current.y, x1: offsetX, y1: offsetY, color, strokeWidth, tool, roomId };
      drawOnCanvas(contextRef.current, shapeData);
    }
  };

  useImperativeHandle(ref, () => ({
    clearCanvas() {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      socket.emit('clear', { roomId });
    },
    getCanvasAsDataURL: () => {
      const canvas = canvasRef.current;
      const context = contextRef.current;
      const originalData = context.getImageData(0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = 'destination-over';
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.putImageData(originalData, 0, 0);
      context.globalCompositeOperation = 'source-over';
      return dataUrl;
    },
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
      className="w-full h-full"
    />
  );
});

Board.displayName = 'Board';
export default Board;