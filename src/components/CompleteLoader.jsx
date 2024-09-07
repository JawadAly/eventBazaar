import React from 'react';
import MUIProgress from './MUIProgress';

const CompleteLoader = () =>{
    return(
        <>
            <div className='completeLoaderHolder'>
                <MUIProgress/>
            </div>
        </>
    );
}
export default CompleteLoader;