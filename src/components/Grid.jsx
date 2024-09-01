import React, { useState, useEffect } from 'react';
import './Grid.css'; // Import the CSS file for styling

const Grid = ({ rows, columns, initialStates }) => {
  const [cellStates, setCellStates] = useState([]);

  // Update cell states when initialStates changes
  useEffect(() => {
    setCellStates(initialStates);
  }, [initialStates]);

  const handleClick = (index) => {
    setCellStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const cells = [];
  for (let index = 0; index < rows * columns; index++) {
    let cellClass = '';
    if (index === 0) {
      cellClass = 'beginning'; // Class for the first cell
    } else if (index === (rows * columns) - 1) {
      cellClass = 'goal'; // Class for the last cell
    }

    cells.push(
      <Cell
        key={index}
        filled={cellStates[index]}
        className={cellClass}
        onClick={() => handleClick(index)}
      />
    );
  }

  // Construct the dynamic grid class
  const colClass = `grid grid-cols-${columns} gap-0`;

  return (
    <div className={colClass}>
      {cells}
    </div>
  );
};

function Cell({ filled, className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cell crt ${filled ? 'filled' : ''} ${className || ''}`}
    ></div>
  );
}

export default Grid;
