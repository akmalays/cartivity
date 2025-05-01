import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITask } from '../../types/dummy';

interface ConfirmationModalState {
  isOpen: boolean;
  type: string;
  title: string;
  description: string;
  onConfirm?: () => void;
  initialData?: ITask;
}

const initialState: ConfirmationModalState = {
  isOpen: false,
  type: "",
  title: "",
  description: "",
  onConfirm: undefined,
  initialData: undefined,
};

export const modalStore = createSlice({
  name: "confirmation modal",
  initialState,
  reducers: {
    openConfirmationModal: (state, action: PayloadAction<Omit<ConfirmationModalState, "isOpen">>) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.onConfirm = action.payload.onConfirm;
      state.initialData = action.payload.initialData;
    },
    closeConfirmationModal: (state) => {
      state.isOpen = false;
      state.type = "";
      state.title = "";
      state.description = "";
      state.onConfirm = () => {};
    },
  },
});

export const {openConfirmationModal, closeConfirmationModal} = modalStore.actions;
export default modalStore.reducer;
