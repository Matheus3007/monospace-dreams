import React, { useState, useEffect } from 'react';
import './Grid.css'; // Import the CSS file for styling

const Grid = ({ rows, columns, initialStates }) => {
  // Initialize cellStates with 'beginning' and 'goal' cells set to false
  const initializeState = () => {
    return Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: columns }, (_, colIndex) => {
        if ((rowIndex === 0 && colIndex === 0) || (rowIndex === rows - 1 && colIndex === columns - 1)) {
          return false; // Beginning and goal cells
        }
        return true;
      })
    );
  };

  const [cellStates, setCellStates] = useState(initializeState);

  useEffect(() => {
    if (initialStates && Array.isArray(initialStates)) {
      if (initialStates.length === rows && initialStates.every(row => row.length === columns)) {
        // Ensure beginning and goal cells are always false
        const updatedStates = initialStates.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            if ((rowIndex === 0 && colIndex === 0) || (rowIndex === rows - 1 && colIndex === columns - 1)) {
              return false;
            }
            return cell;
          })
        );
        setCellStates(updatedStates);
      }
    }
  }, [initialStates, rows, columns]);

  const handleClick = (row, col) => {
    // Logs current matrix state to console
    // Checks if there's a path from the top left to the bottom right
    const path = [];
    const visited = Array.from({ length: rows }, () => Array(columns).fill(false));
    const dfs = (r, c) => {
      if (r < 0 || r >= rows || c < 0 || c >= columns || cellStates[r][c] || visited[r][c]) {
        console.log(path);
        console.log('No path found!');
        return false;
      }
      if (r === rows - 1 && c === columns - 1) {
        console.log(path);
        console.log('Path found!');
        return true;
      }
      visited[r][c] = true;
      return dfs(r - 1, c) || dfs(r + 1, c) || dfs(r, c - 1) || dfs(r, c + 1);
    };
    
    // If bottom left is clicked, set all to true
    if (row === rows - 1 && col === 0) {
      setCellStates(initializeState());
      return;
    }

    setCellStates(prevStates => {
      const newStates = prevStates.map(r => r.slice()); // Create a deep copy of cellStates

      // List of adjacent cells to toggle (excluding boundaries)
      const adjacentCells = [
        [row - 1, col],              // Top cell
        [row + 1, col],              // Bottom cell
        [row, col - 1],              // Left cell
        [row, col + 1]               // Right cell
      ];

      adjacentCells.forEach(([r, c]) => {
        if (r >= 0 && r < rows && c >= 0 && c < columns) {
          // Ensure beginning and goal cells are not toggled
          if (!((r === 0 && c === 0) || (r === rows - 1 && c === columns - 1))) {
            newStates[r][c] = !newStates[r][c];
          }
        }
      });
      console.log(newStates.map(row => row.map(cell => cell ? '#' : '.').join(' ')));
      return newStates;
    });
  };

  return (
    <div className={`grid grid-cols-${columns} gap-0`}>
      {cellStates.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isBeginning = rowIndex === 0 && colIndex === 0;
          const isGoal = rowIndex === rows - 1 && colIndex === columns - 1;
          return (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              filled={cell}
              className={isBeginning ? 'beginning' : isGoal ? 'goal' : ''}
              onClick={() => handleClick(rowIndex, colIndex)}
            />
          );
        })
      )}
    </div>
  );
};

function Cell({ filled, className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cell ${filled ? 'filled' : ''} ${className || ''}`}
    ></div>
  );
}

export default Grid;
