import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { taskData } from '../../dummy/dummy';
import { ITask } from '../../types/dummy';

interface TasksState {
  tasks: ITask[];
  isLoading: boolean;
}

const initialState: TasksState = {
  tasks: taskData,
  isLoading: false,
};

export const taskStore = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    //create new task
    addNewTask: (state, action: PayloadAction<Omit<ITask, "id">>) => {
      const newId = Math.max(...state.tasks.map((task) => task.id)) + 1;
      state.tasks.push({
        id: newId,
        ...action.payload,
      });
    },

    // delete task
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    // finish task
    toggleTaskDone: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.done = !task.done;
      }
    },

    // update task
    updateTask: (state, action: PayloadAction<Partial<ITask> & {id: number}>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload,
        };
      }
    },

    // Reset data
    resetTasks: (state) => {
      state.tasks = taskData;
    },

    //loading state
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {addNewTask, deleteTask, toggleTaskDone, updateTask, resetTasks, setIsLoading} = taskStore.actions;

export default taskStore.reducer;
