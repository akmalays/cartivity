import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  pageType: string;
  isLoading: boolean;
}

const initialState: userState = {
  pageType: "task",
  isLoading: false,
};

export const userStore = createSlice({
  name: "user store",
  initialState,
  reducers: {
    setUserPageType: (state, action: PayloadAction<{pageType: string}>) => {
      state.pageType = action.payload.pageType;
    },
    setIsLoading: (state, action: PayloadAction<{isLoading: boolean}>) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const {setUserPageType, setIsLoading} = userStore.actions;
export default userStore.reducer;
