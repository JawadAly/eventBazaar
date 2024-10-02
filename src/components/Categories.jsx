import React, { useContext } from "react";
// import CategIcons from './CategIcons';
import Slider from "react-slick";
// import {eventCategs} from '../apis/Categs';
import { getCentralStoreData } from "./MainContext";
import MUIProgress from "./MUIProgress";
import { Link } from "react-router-dom";

const Categories = () => {
  const {eventCategs} = getCentralStoreData();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <section className='categsSection mt-5'>
        <div className='container'>
        <h3 className="eventsSecHeading ps-3 mb-5">Categories</h3>
      {/* <div className='categHolder p-3 pb-5 mb-5'> */}
      {eventCategs && eventCategs.length !== 0 ? (
        <Slider {...settings} style={{ marginBottom: "60px" }}>
          {eventCategs.map((value, index) => {
            return (
              <>
                <Link to={`/eventBazaar/categories/${value.name}`} style={{textDecoration:'none'}}>
                  <div className="categFlexer d-flex align-items-center justify-content-center pb-3">
                    <div
                      key={index}
                      className="myCateg"
                    >
                      {/* <CategIcons categicon={value.categIconName} /> */}
                      <p className="categName text-dark">{value.name}</p>
                      <h1 className="categCount">{index+1}</h1>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
        </Slider>
      ) : (
        <div className="text-center pb-4 pt-0">
            <MUIProgress />
        </div>
      )}
      {/* </div> */}
        </div>
      </section>
    </>
  );
};
export default Categories;
