import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const API_KEY = "634abd9b7f2fa5de8f85be69d43aeeb8";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city,{rejectWithValue}) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    if (!res.ok){
      return rejectWithValue(data.message)
    }
    return data;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetWeather:(state)=>{
      state.data =null;
      state.error =null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
