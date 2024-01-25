import React, { useState } from 'react';
import { TextField } from '@mui/material';
export function Textinput(props) {
  const { name = '', details = () => {} } = props;
  const [input, setInput] = useState('');
  const handleInput = e => {
    setInput(e.target.value);
  };
  return (
    <div>
      <TextField
      size='small'
        name={name}
        label={name}
        variant='outlined'
        required
        fullwidth
        value={input}
        onChange={handleInput}
        
      />
      {details(name, input)}
    </div>
  );
}
