// Grid.js
import React, { useState } from 'react';
import './Grid.css'; // Import the CSS file for styling

const Grid = ({ rows, columns, cellSize }) => {
  const [grid, setGrid] = useState(Array.from({ length: rows }, () => Array(columns).fill(false)));

  const toggleCell = (row, col) => {
    const newGrid = grid.map((r, i) => r.map((cell, j) => (i === row && j === col ? !cell : cell)));
    setGrid(newGrid);
  };

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        width: `${columns * cellSize}px`,
        height: `${rows * cellSize}px`,
      }}
    >
      {grid.flat().map((cell, index) => (
        <div
          key={index}
          className={`cell ${cell ? 'filled' : ''}`}
          onClick={() => {
            const row = Math.floor(index / columns);
            const col = index % columns;
            toggleCell(row, col);
          }}
        ></div>
      ))}
    </div>
  );
};

export default Grid;
