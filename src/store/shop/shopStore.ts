import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface shopState {
  categoryActive: string;
  isShopPageLoading: boolean;
  isPageDetailLoading: boolean;
}

const initialState: shopState = {
  categoryActive: "special price",
  isShopPageLoading: false,
  isPageDetailLoading: false,
};

export const shopStore = createSlice({
  name: "shop store",
  initialState,
  reducers: {
    setCategoryActive: (state, action: PayloadAction<{categoryActive: string}>) => {
      state.categoryActive = action.payload.categoryActive;
    },
    setIsShopPageLoading: (state, action: PayloadAction<{isShopPageLoading: boolean}>) => {
      state.isShopPageLoading = action.payload.isShopPageLoading;
    },
    setIsPageDetailLoading: (state, action: PayloadAction<{isPageDetailLoading: boolean}>) => {
      state.isPageDetailLoading = action.payload.isPageDetailLoading;
    },
  },
});

export const {setCategoryActive, setIsShopPageLoading, setIsPageDetailLoading} = shopStore.actions;
export default shopStore.reducer;
