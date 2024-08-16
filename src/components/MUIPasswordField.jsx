import React,{useState} from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';

const MUIPasswordField = ({ val, changeEvent, name, label}) =>{
    const [showPassword, setShowPassword] = useState(false);
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    return(
      <>
        <FormControl sx={{ m: 1}} variant="outlined" fullWidth>
          <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>
          <OutlinedInput
            id={`outlined-adornment-${name}`}
            required
            value={val}
            onChange={changeEvent}
            name={name}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ?  <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            startAdornment={
              <InputAdornment position='start'>
                <LockIcon/>
              </InputAdornment>
            }
            label={label}
          />
        </FormControl>
      </>
    );
}
export default MUIPasswordField;