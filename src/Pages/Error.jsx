import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  const errorGiph =
    "https://media1.giphy.com/avatars/404academy/kGwR3uDrUKPI.gif";
  return (
    <>
      <section className="errorSection">
        <div className="container">
          <div className="errorFlexer">
            <img src={errorGiph} className="img-fluid errorGiphy" alt="errorGiph" />
            <div className="goBackBtn">
            <IconButton 
            aria-label="delete"
            size="large"
            style={{backgroundColor:'#bc2649',color:'white'}}
            onClick={()=>{
              (window.history.length > 1) ? navigate(-1) : navigate('/');
            }}
            >
              <ArrowBackIcon fontSize="inherit"/>
            </IconButton>
                
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Error;
