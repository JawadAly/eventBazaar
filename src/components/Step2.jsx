import React, { useContext, useEffect, useRef, useState,useMemo } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import MUITextField from "../components/MUITextField";
import { LocationIcon } from "./Socials";
import SimpleMUIButton from "./SimpleMUIButton";
import { stepContext } from "./EventsContext";
import CircularProgress from "@mui/material/CircularProgress";

let libraries = ["places", "marker"];
const Step2 = () => {
  const {
    currentStep,
    setCurrentStep,
    eventData,
    setEventData,
    senseEventDataChange,
    toast
  } = useContext(stepContext);
  // working for google map api

  const [marker, setMarker] = useState(eventData.locationCenterCords);
  const autoCompleteRef = useRef(null);
  const memoizedLibraries = useMemo(() => libraries, []); 

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    libraries: memoizedLibraries,
  });

  // useEffect(()=>{
  //   if(mapRef.current && marker){
  //     const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
  //       position: marker,
  //       map: mapRef.current,
  //       title: "Event Location",
  //     });
  //   }
  // },[marker,isLoaded]);
  const handleLocationChange = () => {
    if (autoCompleteRef.current) {
      const place = autoCompleteRef.current.getPlace();
      let conciseLocation = "";
      if (place) {
        conciseLocation = place.name;
      }

      const addressComponents = place.address_components;
      if (addressComponents) {
        const street = addressComponents.find((comp) =>
          comp.types.includes("route")
        )?.long_name;
        const city = addressComponents.find((comp) =>
          comp.types.includes("locality")
        )?.long_name;
        const country = addressComponents.find((comp) =>
          comp.types.includes("country")
        )?.long_name;

        // Append street/road if available
        if (street) {
          conciseLocation += conciseLocation ? `, ${street}` : street;
        }

        // Append city if available
        if (city) {
          conciseLocation += conciseLocation ? `, ${city}` : city;
        }

        // Append country if available
        if (country) {
          conciseLocation += conciseLocation ? `, ${country}` : country;
        }
      }

      if (place.geometry) {
        const location = place.geometry.location;
        const newCenter = {
          lat: location.lat(),
          lng: location.lng(),
        };
        setEventData((prevVal) => {
          return {
            ...prevVal,
            eventLocation: conciseLocation,
            locationCenterCords: newCenter,
          };
        });
        setMarker(newCenter);
      }
    }
  };
  const mapStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <>
      <h4 className="mt-4">Where is it going to happen?</h4>
      <div className="mapAndInputHolder w-100 d-flex align-items-center justify-content-center">
        <div className="col-md-5 col-10 locationInputHolder bg-white pe-3 text-center">
          {!isLoaded ? (
            <CircularProgress />
          ) : (
            <>
              <Autocomplete
                onLoad={(autocomplete) =>
                  (autoCompleteRef.current = autocomplete)
                }
                onPlaceChanged={handleLocationChange}
              >
                <MUITextField
                  label="Location"
                  // startAdornmentIcon={LocationIcon}
                  name="eventLocation"
                  val={eventData.eventLocation}
                  changeEvent={senseEventDataChange}
                />
              </Autocomplete>
            </>
          )}
        </div>
        {!isLoaded ? (
          <CircularProgress />
        ) : (
          <GoogleMap
            // onLoad={(map)=>mapRef.current = map}
            zoom={14}
            center={marker}
            mapContainerStyle={mapStyle}
            options={{
              disableDefaultUI: true,
            }}
          >
            <Marker position={marker} />
          </GoogleMap>
        )}
      </div>

      <div className="col-2 d-flex justify-content-between">
        <div className="continueBtnHolder p-2 mt-2">
          <SimpleMUIButton
            passesFunc={(e) => {
              e.preventDefault();
              eventData.eventLocation === ""
                ? toast.error("Please provide the location of the event!")
                : setCurrentStep(currentStep + 1);
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
export default Step2;
