import React from 'react';
import {events} from '../apis/EventsData';

const CarouselF = () => {

  return (
    <>
  <div id="carouselExampleFade" className="carousel slide carousel-fade myCarousel" data-bs-ride="carousel">
        <div className="carousel-inner">

          {events.map((value,index)=>{
              return(
                  <div className="carousel-item active" key={index}>
                    <img src={value.backgroundImage} className="d-block w-100 slider-img img-fluid" alt={value.eventName}/>
                  </div>
              );
          })}
          
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
        <div className='carouselTint d-flex align-items-center ps-5'>
          <div className='typeWriter'>
            <h1 className='tintText'>Turning Moments into
              <br/>
            Memories
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarouselF;
