import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export function Dropdown(props) {
  const { name = '', multiproperties = [], details = () => {} } = props;
  const [state, setState] = useState(`${multiproperties[0]}`);
  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  return (
    <div>
      <InputLabel id='demo-simple-select-label'>{name}</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        defaultValue={state}
        value={state}
        label={name}
        required
        onChange={handleChange}
      >
        {multiproperties.map((property, index) => (
          <MenuItem key={index} value={property}>
            {property}
          </MenuItem>
        ))}
      </Select>
      {details(name, state)}
    </div>
  );
}
