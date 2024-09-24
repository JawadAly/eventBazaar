import React,{useContext} from "react";
import MUITextField from "../components/MUITextField";
import Slider from "react-slick";
import SimpleMUIButton from "./SimpleMUIButton";
import { stepContext } from "./EventsContext";
import CancelIcon from '@mui/icons-material/Cancel';

const Step5 = () => {
    const{currentStep,setCurrentStep,eventData,setEventData,senseEventDataChange,removeEventImage,toast} = useContext(stepContext);
    var settings = {
      dots: true,
      infinite: false,
      arrows:false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

  return (
    <>
      <h4 className="mt-4">Have a name and photo for your event?</h4>
      <div className="row">
        <div className="col-md-5 col-12 mt-2">
          {
            eventData.eventImagesUrls && eventData.eventImagesUrls.length > 0  ? (
                <Slider {...settings} style={{ marginBottom: "20px" }}>
                  {
                    eventData.eventImagesUrls.map((val,index)=>{
                      return (
                        <div key={index} className ="custom-file-input-holder">
                            <img className="custom-file-input-img" src={val} alt={`${eventData.eventTitle}-${index}`} />
                            <div className="cancelBtnHolder" onClick={()=>removeEventImage(index)}>
                              <CancelIcon className="themeColor"/>
                            </div>
                        </div>
                      );
                    })
                  }
                </Slider> 
            ) : (
              <div className ="custom-file-input-holder" onClick={()=>document.getElementById('formFile').click()}>
                <p className="uploadImgText">Upload Image</p>
                <input
                className="custom-file-input d-none"
                type="file"
                id="formFile"
                accept="image/*"
                // name="eventBanner"    
                name="eventImages"    
                multiple
                // value={eventData.eventBanner}
                onChange={senseEventDataChange}
                />
            </div>
            )
          }
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-12 mt-3 pe-4">
          <MUITextField 
          label="Name" 
          name='eventTitle'  
          val={eventData.eventTitle}
          changeEvent={senseEventDataChange}
          />
        </div>
      </div>
      <div className="col-2 d-flex justify-content-between">
        <div className="continueBtnHolder p-2 mt-2">
          <SimpleMUIButton
            passesFunc={(e) => {
              e.preventDefault();
              eventData.eventImages.length === 0 && eventData.eventImagesUrls.length === 0 || eventData.eventTitle === '' ? toast.error('Please fill out the required fields!') : setCurrentStep(currentStep + 1);
            }}
            type="contained"
            content="Continue"
          />
        </div>
        <div className="abortBtnHolder p-2 mt-2">
          <SimpleMUIButton
            type="contained"
            content="Back"
            passesFunc={() => setCurrentStep(currentStep - 1)}
          />
        </div>
      </div>
    </>
  );
};
export default Step5;

// {
//   eventData.eventImagesUrls && eventData.eventImagesUrls.length > 0  ? (
//     <Slider {...settings} style={{ marginBottom: "20px" }}>
//     {
//       eventData.eventImagesUrls.map((val,index)=>{
//         console.log(val);
//         return(
//           <div key={index} className ="custom-file-input-holder">
//             <img className="custom-file-input-img" src={val} alt={eventData.eventTitle} />
//           </div>
//         );
//         })
//     }
//       </Slider> 
//     ) : (
//       <div className ="custom-file-input-holder" onClick={()=>document.getElementById('formFile').click()}>
//           <p className="uploadImgText">Upload Image</p>
//           <input
//           className="custom-file-input d-none"
//           type="file"
//           id="formFile"
//           accept="image/*"
//           // name="eventBanner"    
//           name="eventImages"    
//           multiple
//           // value={eventData.eventBanner}
//           onChange={senseEventDataChange}
//           />
//       </div>
//     )
// }