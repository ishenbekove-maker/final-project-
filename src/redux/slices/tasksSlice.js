import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tasksAPI } from '../../services/api';

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const data = await tasksAPI.getAll();
    return data.slice(0, 30); // limit for demo
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const createTask = createAsyncThunk('tasks/create', async (taskData, { rejectWithValue }) => {
  try {
    return await tasksAPI.create(taskData);
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    return await tasksAPI.update(id, data);
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id, { rejectWithValue }) => {
  try {
    await tasksAPI.delete(id);
    return id;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchQuery: '',
    filterStatus: 'all', // all | completed | active
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setFilterStatus(state, action) {
      state.filterStatus = action.payload;
    },
    toggleTaskLocal(state, action) {
      const task = state.items.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTasks.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchTasks.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(createTask.pending, (state) => { state.loading = true; })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        // JSONPlaceholder returns id=201 always, so give unique id
        const newTask = { ...action.payload, id: Date.now() };
        state.items.unshift(newTask);
      })
      .addCase(createTask.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.items.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })

      .addCase(deleteTask.pending, (state) => { state.loading = true; })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(t => t.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { setSearchQuery, setFilterStatus, toggleTaskLocal, clearError } = tasksSlice.actions;

// Selectors
export const selectFilteredTasks = (state) => {
  const { items, searchQuery, filterStatus } = state.tasks;
  return items
    .filter(t => {
      if (filterStatus === 'completed') return t.completed;
      if (filterStatus === 'active') return !t.completed;
      return true;
    })
    .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
};

export default tasksSlice.reducer;
