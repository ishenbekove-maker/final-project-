import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postsAPI } from '../../services/api';

export const fetchPosts = createAsyncThunk('posts/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const data = await postsAPI.getAll();
    return data.slice(0, 20);
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const createPost = createAsyncThunk('posts/create', async (postData, { rejectWithValue }) => {
  try {
    return await postsAPI.create(postData);
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const deletePost = createAsyncThunk('posts/delete', async (id, { rejectWithValue }) => {
  try {
    await postsAPI.delete(id);
    return id;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: { items: [], loading: false, error: null, searchQuery: '' },
  reducers: {
    setPostSearch(state, action) { state.searchQuery = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchPosts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchPosts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift({ ...action.payload, id: Date.now() });
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  },
});

export const { setPostSearch } = postsSlice.actions;
export const selectFilteredPosts = (state) =>
  state.posts.items.filter(p =>
    p.title.toLowerCase().includes(state.posts.searchQuery.toLowerCase()) ||
    p.body.toLowerCase().includes(state.posts.searchQuery.toLowerCase())
  );
export default postsSlice.reducer;
