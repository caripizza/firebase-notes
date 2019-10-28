/*
can get more results with the Places API (for handling ambiguous queries)
 - whereas the Geocoding API is more for complete postal address strings
  * filtering: https://developers.google.com/maps/documentation/geocoding/intro#ComponentFiltering
*/
export const geocodeApiSearch = searchInput => {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GEOCODING_API_KEY}&address=${searchInput}`)
    .then(res => res.json())
    .then(data => {
      return data.results;
    });
};
