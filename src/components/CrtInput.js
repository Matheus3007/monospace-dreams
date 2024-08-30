import React, { useState } from 'react';
import './CrtInput.css'; // Assuming your CSS is in CrtInput.css

const CrtInput = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit(inputValue); // Pass the input value to the parent component or handle it internally
      setInputValue(''); // Clear the input after submission if needed
    }
  };

  return (
    <div className='container'>
      <p className='inline'>></p>
      <input
        className='terminal-input'
        type='text'
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default CrtInput;
