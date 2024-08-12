import React,{useState} from 'react';
import Groups2Icon from '@mui/icons-material/Groups2';
import CelebrationIcon from '@mui/icons-material/Celebration';
import FestivalIcon from '@mui/icons-material/Festival';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import GroupsIcon from '@mui/icons-material/Groups';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CategIcons from './CategIcons';

const Categories = () =>{
    const[eventCategs,setEventCategs] = useState([
        {
            categName:'Concert',
            categIconName:Diversity3Icon
        },
        {
            categName:'Conference',
            categIconName:Groups2Icon
        },
        {
            categName:'Seminar',
            categIconName:GroupsIcon
        },
        {
            categName:'Party',
            categIconName:CelebrationIcon
        },
        {
            categName:'Festival',
            categIconName:FestivalIcon
        },
        {
            categName:'Sports',
            categIconName:SportsEsportsOutlinedIcon
        },
        {
            categName:'Comedy',
            categIconName:TheaterComedyIcon
        },
        {
            categName:'Stage Show',
            categIconName:SlideshowIcon
        },
        {
            categName:'Qawali',
            categIconName:MicExternalOnIcon
        }
    ]);
    return(
        <>
            <h3 className='eventsSecHeading ps-3 mb-3'>Categories</h3>
            <div className='categHolder p-3 pb-5 mb-5'>
            {
                eventCategs.map((value,index)=>{
                    return(
                        <>
                            <div className='categFlexer d-flex align-items-center justify-content-center'>
                                <div key={index} className='myCateg d-flex align-items-center justify-content-center'>
                                    <CategIcons categicon={value.categIconName} />
                                    <p className='categName'>{value.categName}</p>
                                </div>
                            </div>
                        </>
                    );
                })
            }
            </div>
        </>
    );
}
export default Categories;