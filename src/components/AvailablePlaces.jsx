import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

// const places = localStorage.getItem('places')

export default function AvailablePlaces({ onSelectPlace }) {
  // TODO : FETCH AVAILABLE PLACES FROM THE BACKEND API FROM WHERE WE CAN FETCH OUR DATA 

  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState()

  // as we are setting the state in the fetch  last then block then the function will goes into the infinite loop so
  // we have to use side effect hook here to tackle the infinite loop 

  //METHOD 1 
  // useEffect(() => {
  //   fetch("http://localhost:3000/places").then((response) => {
  //     return response.json()
  //   }).then((resData) => {
  //     setAvailablePlaces(resData.places)
  //   })
  // }, [])

  //METHOD 2 
  // you cannot use the async await directly in react but you can create the extra functions by which this can happen 
  useEffect(() => {
    async function fetchPlaces() {

      try {
        const places = await fetchAvailablePlaces();
        // now we are trying to set the locations based of the nearest of the user location
        navigator.geolocation.getCurrentPosition((position)=>{

          const sortedPlaces  = sortPlacesByDistance(places , position.coords.latitude, position.coords.longitude);

          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });


      } catch (error) {
        setError({message: error.message || "Could not found Places, Please try again later"});
        setIsFetching(false);
      }
    };
    fetchPlaces();
  });

  if(error){
    return <Error title="An error Occured!" message={error.message}/>
  }



  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching some data ... please wait a while ... "
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
