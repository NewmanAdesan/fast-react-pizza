import {createSlice} from '@reduxjs/toolkit'

/**
  function getPosition() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async function fetchAddress() {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  }
*/


// 1. CREATE THE INITIAL STATE OBJECT FOR USER DATA
const initialState = {
    username: ''
}


// 2. CREATE THE USER DATA SLICE REDUCER & ACTION CREATORS
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      updateName(state, action) {
        state.username = action.payload
      }
    }
})


// 3. EXPORT THE REDUCER & THE AUTOMATICALLY CREATED ACTIONS
export const {updateName} = userSlice.actions
export default userSlice.reducer


// 4. CREATE SELECTOR FUNCTIONS USED TO CONSUME STORE DATA 
export const getUsername = (state) => state.user.username


