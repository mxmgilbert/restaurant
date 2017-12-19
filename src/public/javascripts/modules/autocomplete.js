/**
 * Autocomplete Address, lat & lng inputs with Google Maps Api infos
 * @param {*} input 
 * @param {*} latInput 
 * @param {*} lngInput 
 */
function autocomplete(input, latInput, lngInput) {
  // Skip this function from running if there is no input on the page
  if (!input) return;

  //get the adress from Google Maps API
  const dropdown = new google.maps.places.Autocomplete(input);

  //get lat & lng and fill the inputs
  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });

  // Don't submit the form when pressing enter on address input cause it use to confirm autocomplete
  input.on('keydown', (e) => {
    if(e.keyCode == 13) e.preventDefault();
  });

}

export default autocomplete;