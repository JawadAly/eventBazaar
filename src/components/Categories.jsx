import React,{useState} from 'react';
import CategIcons from './CategIcons';
import Slider from "react-slick";
import {eventCategs} from '../apis/Categs';

const Categories = () =>{
    // const[eventCategs,setEventCategs] = useState([
    //     {
    //         categName:'Concert',
    //         categIconName:Diversity3Icon
    //     },
    //     {
    //         categName:'Conference',
    //         categIconName:Groups2Icon
    //     },
    //     {
    //         categName:'Seminar',
    //         categIconName:GroupsIcon
    //     },
    //     {
    //         categName:'Party',
    //         categIconName:CelebrationIcon
    //     },
    //     {
    //         categName:'Festival',
    //         categIconName:FestivalIcon
    //     },
    //     {
    //         categName:'Sports',
    //         categIconName:SportsEsportsOutlinedIcon
    //     },
    //     {
    //         categName:'Comedy',
    //         categIconName:TheaterComedyIcon
    //     },
    //     {
    //         categName:'Stage Show',
    //         categIconName:SlideshowIcon
    //     },
    //     {
    //         categName:'Qawali',
    //         categIconName:MicExternalOnIcon
    //     }
    // ]);

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
                }
              },
            {
                breakpoint: 1200,
                settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1
                
                }
            }
    ]
      };
    return(
        <>
            <h3 className='eventsSecHeading ps-3 mb-5'>Categories</h3>
            {/* <div className='categHolder p-3 pb-5 mb-5'> */}
            <Slider {...settings} style={{marginBottom:'60px'}}>
            {
                eventCategs.map((value,index)=>{
                    return(
                        <>
                            <div className='categFlexer d-flex align-items-center justify-content-center pb-5'>
                                <div key={index} className='myCateg d-flex align-items-center justify-content-center'>
                                    <CategIcons categicon={value.categIconName} />
                                    <p className='categName'>{value.categName}</p>
                                </div>
                            </div>
                        </>
                    );
                })
            }
            </Slider>
            {/* </div> */}
        </>
    );
}
export default Categories;