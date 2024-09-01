import React, { useState, useEffect } from 'react';
import './Grid.css'; // Import the CSS file for styling

const Grid = ({ rows, columns, initialStates, onMazeSolved }) => {
  const [cellStates, setCellStates] = useState(() => initializeState());

  // Initialize cellStates with 'beginning' and 'goal' cells set to false
  function initializeState() {
    return Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: columns }, (_, colIndex) => {
        if ((rowIndex === 0 && colIndex === 0) || (rowIndex === rows - 1 && colIndex === columns - 1)) {
          return false; // Beginning and goal cells
        }
        return true;
      })
    );
  }

  const breadthFirstSearch = (x, y, maze) => {
    const queue = [[x, y]]; 
    maze[x][y] = '0';
    while (queue.length > 0) {
      const [x, y] = queue.shift();
      if (x === maze.length - 1 && y === maze[0].length - 1) {
        return true;
      }
      const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < maze.length && ny >= 0 && ny < maze[0].length && maze[nx][ny] === '.') {
          queue.push([nx, ny]);
          maze[nx][ny] = '0';
        }
      }
    }
    return false;
  };

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
    if (row === rows - 1 && col === 0) {
      setCellStates(initializeState());
      return;
    }

    setCellStates(prevStates => {
      const newStates = prevStates.map(r => r.slice());
      const adjacentCells = [
        [row - 1, col],              
        [row + 1, col],              
        [row, col - 1],              
        [row, col + 1]               
      ];

      adjacentCells.forEach(([r, c]) => {
        if (r >= 0 && r < rows && c >= 0 && c < columns) {
          // Ensure beginning and goal cells are not toggled
          if (!((r === 0 && c === 0) || (r === rows - 1 && c === columns - 1))) {
            newStates[r][c] = !newStates[r][c];
          }
        }
      });

      // Convert boolean grid to '.' and '#' for BFS
      const mazeForSearch = newStates.map(row => row.map(cell => cell ? '#' : '.'));

      // Perform BFS and update mazeSolved state
      const solved = breadthFirstSearch(0, 0, mazeForSearch);
      onMazeSolved(solved); // Use the setter function from props

      return newStates;
    });
  };

  return (
    <div className={`grid grid-cols-12 gap-0`}>
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
