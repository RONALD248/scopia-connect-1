import { useState, useEffect, useCallback } from 'react';

export interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number | null;
  error: GeolocationPositionError | null;
  loading: boolean;
}

export interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watch?: boolean;
}

const defaultOptions: GeolocationOptions = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 0,
  watch: false,
};

export function useGeolocation(options: GeolocationOptions = {}) {
  const { enableHighAccuracy, timeout, maximumAge, watch } = { ...defaultOptions, ...options };
  
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
    timestamp: null,
    error: null,
    loading: false,
  });

  const onSuccess = useCallback((position: GeolocationPosition) => {
    setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      altitude: position.coords.altitude,
      altitudeAccuracy: position.coords.altitudeAccuracy,
      heading: position.coords.heading,
      speed: position.coords.speed,
      timestamp: position.timestamp,
      error: null,
      loading: false,
    });
  }, []);

  const onError = useCallback((error: GeolocationPositionError) => {
    setState(prev => ({
      ...prev,
      error,
      loading: false,
    }));
  }, []);

  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: {
          code: 0,
          message: 'Geolocation is not supported by this browser.',
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        } as GeolocationPositionError,
        loading: false,
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    
    navigator.geolocation.getCurrentPosition(
      onSuccess,
      onError,
      { enableHighAccuracy, timeout, maximumAge }
    );
  }, [enableHighAccuracy, timeout, maximumAge, onSuccess, onError]);

  useEffect(() => {
    if (!watch) return;

    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: {
          code: 0,
          message: 'Geolocation is not supported by this browser.',
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        } as GeolocationPositionError,
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true }));
    
    const watchId = navigator.geolocation.watchPosition(
      onSuccess,
      onError,
      { enableHighAccuracy, timeout, maximumAge }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [watch, enableHighAccuracy, timeout, maximumAge, onSuccess, onError]);

  return {
    ...state,
    getCurrentPosition,
    isSupported: typeof navigator !== 'undefined' && !!navigator.geolocation,
  };
}
