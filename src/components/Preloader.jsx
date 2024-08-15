import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Preloader = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handCloseAfterTime = () =>{
    setTimeout(() => {
        handleClose();
    }, 3000);
  }
  useEffect(() => {
    handleOpen();
    handCloseAfterTime();
  }, []);
  return (
    <>
      <div className="preloader" style={{display : open ?  'block':'none'}}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <div className="columnLayout">
                <div className="preLoaderNavLogo">
                    <a href="#">
                        <img src='./images/eventBazarLogo.png' alt='brandLogo' className='img-fluid'/>
                    </a>
                </div>
            <CircularProgress color="warning"/>
          </div>
        </Backdrop>
      </div>
    </>
  );
};
export default Preloader;
