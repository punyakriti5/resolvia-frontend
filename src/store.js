import { configureStore,combineReducers } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice.js';

// const rootReducer = combineReducers({
//   user: userReducer,
 
// });

export const store = configureStore({
  reducer: {
    user : userReducer
  },
})