// Grid.js
import React, { useState } from 'react';
import './Grid.css'; // Import the CSS file for styling


const Grid = ({ rows, columns, cellSize }) => {
  let grid_cols = 8;
  let grid_rows = 8;
  const cells = [];
  for (let index = 0; index < grid_cols*grid_rows; index++) {
    cells.push(<Cell />)
    
  }
  return (
    
    <div class="grid grid grid-cols-8 gap-0 grid-width">
      {cells}
    </div>
  );
};

function Cell() {
  const [filled, setFilled] = useState(true);
  function handleClick() {
    console.log('Cell clicked:', filled);
    setFilled(!filled);
  }
  return <div onClick={handleClick} className={`cell ${filled ? 'filled' : ''}`}></div>;
}

export default Grid;
