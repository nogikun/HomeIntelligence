"use client"

import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchTemperatureData } from '../store/temperatureSlice'

export const useTemperatureMonitor = (intervalMinutes: number = 1) => {
  const dispatch = useAppDispatch()
  const { data, isLoading, error, lastFetch } = useAppSelector(
    (state) => state.temperature
  )
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Initial fetch
    dispatch(fetchTemperatureData('Remo'))

    // Set up interval for periodic fetching
    intervalRef.current = setInterval(() => {
      dispatch(fetchTemperatureData('Remo'))
    }, intervalMinutes * 60 * 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [dispatch, intervalMinutes])

  const startMonitoring = () => {
    if (!intervalRef.current) {
      dispatch(fetchTemperatureData('Remo'))
      intervalRef.current = setInterval(() => {
        dispatch(fetchTemperatureData('Remo'))
      }, intervalMinutes * 60 * 1000)
    }
  }

  const stopMonitoring = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const fetchNow = () => {
    dispatch(fetchTemperatureData('Remo'))
  }

  return {
    data,
    isLoading,
    error,
    lastFetch,
    startMonitoring,
    stopMonitoring,
    fetchNow,
  }
}