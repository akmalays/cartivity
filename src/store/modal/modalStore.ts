import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfirmationModalState {
  isOpen: boolean;
  title: string;
  description: string;
  type: string;
}

const initialState: ConfirmationModalState = {
  isOpen: false,
  title: "",
  description: "",
  type: "",
};

export const modalStore = createSlice({
  name: "confirmation modal",
  initialState,
  reducers: {
    openConfirmationModal: (state, action: PayloadAction<{title: string; type: string; description: string}>) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
    closeConfirmationModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const {openConfirmationModal, closeConfirmationModal} = modalStore.actions;
export default modalStore.reducer;
