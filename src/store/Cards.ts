import { character, fav } from '../types/character'

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CharsState {
  characters: character[]
  favCards: fav[] | null
}

const initialState: CharsState = {
    characters: [],
    favCards: null
}

export const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    storeCards: (state, char: PayloadAction<character[]>) => {
      state.characters = char.payload
    },
    getFavCards: (state) => {
      state.favCards = JSON.parse(localStorage.getItem('fav')!)
    },
    setFavCards: (state, favs: PayloadAction<fav[] | null>) =>{
      state.favCards = favs.payload
    }
  }
})

export const { storeCards, getFavCards, setFavCards } = cardSlice.actions

export default cardSlice.reducer