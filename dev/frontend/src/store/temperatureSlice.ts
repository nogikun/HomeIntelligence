import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface TemperatureData {
  timestamp: string
  temperature: number
  humidity: number
  device_name?: string
}

export interface TemperatureState {
  data: TemperatureData[]
  isLoading: boolean
  error: string | null
  lastFetch: string | null
}

const initialState: TemperatureState = {
  data: [],
  isLoading: false,
  error: null,
  lastFetch: null,
}

export const fetchTemperatureData = createAsyncThunk(
  'temperature/fetchData',
  async (device_name: string = 'Remo') => {
    const response = await fetch(`http://localhost:3000/remo/status?device_name=${encodeURIComponent(device_name)}`)
    if (!response.ok) {
      throw new Error('Failed to fetch temperature data')
    }
    const data = await response.json()
    
    if (data.temperature !== undefined && data.humidity !== undefined) {
      return {
        timestamp: new Date().toISOString(),
        temperature: data.temperature,
        humidity: data.humidity,
        device_name: device_name,
      }
    }
    
    throw new Error('Invalid response format - temperature or humidity data missing')
  }
)

const temperatureSlice = createSlice({
  name: 'temperature',
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = []
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemperatureData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTemperatureData.fulfilled, (state, action) => {
        state.isLoading = false
        state.data.push(action.payload)
        state.lastFetch = action.payload.timestamp
        
        // Keep only last 24 hours of data (1440 minutes)
        const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        state.data = state.data.filter(item => item.timestamp > cutoffTime)
      })
      .addCase(fetchTemperatureData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch temperature data'
      })
  },
})

export const { clearData, clearError } = temperatureSlice.actions
export default temperatureSlice.reducer