import React from 'react';
import CarouselF from '../components/Carousel';
import Events from '../components/Events';

const Home = () =>{
    return(
        <>
            <section className='bannerSection'>
                <CarouselF/>
                <Events/>
            </section>
        </>
    );
}
export default Home;