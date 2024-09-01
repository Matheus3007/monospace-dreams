import React from 'react';
import { useState } from 'react';

function printMaze(x, y, maze) {
    // Check if out of bounds or hit a wall or already visited cell
    if (x < 0 || y < 0 || x >= maze.length || y >= maze[0].length || maze[x][y] === '#' || maze[x][y] === '.') {
        return;
    }
    
    maze[x][y] = '.';  // Mark as visited
    console.log(maze.map(row => row.join(' ')).join('\n'));  // Print the current maze state
    
    // Recursive calls to move in different directions
    printMaze(x + 1, y, maze);  // Move down
    printMaze(x - 1, y, maze);  // Move up
    printMaze(x, y + 1, maze);  // Move right
    printMaze(x, y - 1, maze);  // Move left
}


function DisplayGrid(maze){
    const [mazeState, setMazeState] = useState(maze);
    return (
        <div>
            <button onClick={() => printMaze(0, 0, mazeState)}>Start</button>
            <pre>{mazeState.map(row => row.join(' ')).join('\n')}</pre>
        </div>
    );
}