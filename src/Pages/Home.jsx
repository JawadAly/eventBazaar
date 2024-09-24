import React from 'react';
import CarouselF from '../components/Carousel';
import Events from '../components/Events';
import Categories from '../components/Categories';
import { getCentralStoreData } from '../components/MainContext';
import MUIProgress from '../components/MUIProgress';
import EventCard from '../components/EventCard';
import SearchIcon from '@mui/icons-material/Search';

const Home = () =>{
    const{loadingState,setLoadingState,errorState,setErrorState,allEvents,mainSearch} = getCentralStoreData(); 
    const searchFilter = allEvents.filter(item=> item.name.trim().toLowerCase().includes(mainSearch.trim().toLowerCase()));
    return(
        <>
            <section className='bannerSection'>
                <CarouselF/>
                {
                    errorState ? (
                        <section className="eventViewSec">
                            <div className="container">
                                <div className='errorSvgHolder pt-4'> 
                                    <embed type="image/svg+xml" src="/eventBazaar/svgs/ic_error_ocurred.svg" className='emptySvg'/>
                                    <p className='text-center themeColor'>An Error Occurred at our end, please refresh the page or try again later!</p>
                                </div>
                            </div>
                        </section>
                    ) : (
                        loadingState ? (
                            <section className="eventViewSec">
                                <div className="container">
                                    <div className='w-100 text-center p-5'>
                                        <MUIProgress />
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <>
                                <Categories/>
                                {
                                    mainSearch !== '' && searchFilter ? (
                                        <section className='savedEventsSection mt-0'>
                                            <div className='container'>
                                            <h3 className='mt-4'>
                                                Search Results 
                                                <span className='ms-2'>
                                                    <SearchIcon fontSize='large' className='themeColor'/>
                                                </span>
                                            </h3>
                                            <hr/>
                                            {
                                                searchFilter && searchFilter.length !== 0 ? (
                                                    <div className='cardsHolder p-3 mb-5'>
                                                    {
                                                        searchFilter.map((value,index)=>{
                                                            return <EventCard key={index} id={value.id} name={value.name} dateTime={value.date_time} organizer={value.contact.organization} cost={value.price_type} bgImg={value.images[0]}/>;
                                                        })
                                                    }
                                                    </div>   
                                                ) : (
                                                    <section className="eventViewSec">
                                                        <div className="container">
                                                            <div className='errorSvgHolder pt-4'> 
                                                                <embed type="image/svg+xml" src="/eventBazaar/svgs/ic_empty_search.svg" className='emptySvg'/>
                                                                <p className='text-center themeColor'>No such events found...!</p>
                                                            </div>
                                                        </div>
                                                    </section>   
                                                )
                                            }
                                            </div>   
                                        </section>
                                        ) : 
                                    (
                                        <>
                                            <Events/>
                                        </>
                                    )
                                }
                                {/* </div> */}
                            </>
                                
                        )
                    )
                }
            </section>
        </>
    );
}
export default Home;