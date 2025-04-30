import { configureStore } from '@reduxjs/toolkit';

import modalStore from '../store/modal/modalStore';
import shopStore from '../store/shop/shopStore';
import userStore from '../store/user/userStore';

export const store = configureStore({
  reducer: {
    modalStore: modalStore,
    userStore: userStore,
    shopStore: shopStore,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
