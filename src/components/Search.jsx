import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Search = (props) => {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: 400 ,borderRadius:'25px'}}
    >
      <IconButton sx={{ p: '10px',color:'#bc2649'}} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Events"
        inputProps={{ 'aria-label': 'search events',...props }}
      />
      <IconButton type="button" sx={{ p: '10px'}} aria-label="search">
        <SearchIcon sx={{color:'#bc2649'}}/>
      </IconButton>
    </Paper>
  );
};
export default Search;
