import { configureStore } from '@reduxjs/toolkit';

import modalStore from '../store/modal/modalStore';
import shopStore from '../store/shop/shopStore';
import taskStore from '../store/task/taskStore';
import userStore from '../store/user/userStore';

export const store = configureStore({
  reducer: {
    modalStore: modalStore,
    userStore: userStore,
    shopStore: shopStore,
    taskStore: taskStore,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
