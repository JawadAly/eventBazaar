import React from 'react';

const ModalWindow = ({children}) => {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{marginTop:'100px'}}>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalWindow;