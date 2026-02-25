import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "f63632defc744c0d809b67f2f12e5417";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${API_KEY}`
      );

      const data = await res.json();
      return data.articles;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;