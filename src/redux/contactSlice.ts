import { createSlice } from '@reduxjs/toolkit';
import { MMKV } from 'react-native-mmkv';
import { IContact } from '../data/contact';


interface CounterState {
  favourite: IContact[],
  isFavourite: boolean
}

const initialState: CounterState = {
  favourite: [],
  isFavourite: false
}
const storage = new MMKV();

const contactSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    addFavourite: (state, action) => {
      const data = storage.getString('contact');
      const myFavouriteArray:IContact[] = data ? JSON.parse(data) : [];

      if (myFavouriteArray.some((item) => item.id === action.payload.id)) {
        console.log("exist")
      }else{
        console.log("not exist")
         state.favourite.push(action.payload as never);
         storage.set('contact', JSON.stringify(state.favourite) );
         state.isFavourite = true
      }

    },
    fetchFavourite: (state) => {
        const data = storage.getString('contact');
        state.favourite = data ? JSON.parse(data) : [];
        console.log(state.favourite)
    },
    checkFavourite: (state,action) =>{
      const data = storage.getString('contact');
      const myFavouriteArray:IContact[] = data ? JSON.parse(data) : [];

      console.log("data id",action.payload)

      if (myFavouriteArray.some((item) => item.id === action.payload)) {
        state.isFavourite = true
        console.log("sudah favorit")
      }else{
        console.log("belum favorit")
        state.isFavourite = false
      }
    },
    removeFavourite: (state,action) =>{
      const data = storage.getString('contact');
      const myFavouriteArray:IContact[] = data ? JSON.parse(data) : [];

      console.log("data id",action.payload)

      if (myFavouriteArray.some((item) => item.id === action.payload)) {
        myFavouriteArray.splice(myFavouriteArray.indexOf(action.payload), 1);
        state.isFavourite = false
        storage.set('contact', JSON.stringify(myFavouriteArray) );
        console.log("sudah favorit")
      }else{
        console.log("belum favorit")
      }
    },

  },
});

export const { addFavourite, fetchFavourite,checkFavourite,removeFavourite } = contactSlice.actions;
export default contactSlice.reducer;