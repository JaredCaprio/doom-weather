## NOTES

### Pinned Locations

- Store names of cities in Local Storage
- Get them out and do fetch req for each one to give current weather conditions
- Update as soon as pin is clicked

rather than the pin button toggling pinned state, make the pinned location button trigger a different function that just finds that city in the state/local storage and removes it/filters it.

create a custom hook called useLocalStorage that allow you to use local storage as if it was a state variable. Eliminating the need for multiple state variables to hold pinned locations.

pinnedLocations holds just the city name while pinnedLocationsData holds an array of objects containing the weather data from each pinnedCity.

I could set the weather data for each pinnedLocation which would keep it in sync with local storage.
