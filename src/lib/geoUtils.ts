// Haversine formula to calculate distance between two points on Earth
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Format coordinates for display
export function formatCoordinates(lat: number, lon: number): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  
  return `${Math.abs(lat).toFixed(6)}°${latDir}, ${Math.abs(lon).toFixed(6)}°${lonDir}`;
}

// Calculate bearing between two points
export function calculateBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const dLon = toRadians(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(toRadians(lat2));
  const x =
    Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
    Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(dLon);
  
  let bearing = Math.atan2(y, x);
  bearing = (bearing * 180) / Math.PI;
  bearing = (bearing + 360) % 360;
  
  return Math.round(bearing);
}

// Get cardinal direction from bearing
export function getCardinalDirection(bearing: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
  const index = Math.round(bearing / 45);
  return directions[index];
}

// Check if point is within radius (geofencing)
export function isWithinRadius(
  centerLat: number,
  centerLon: number,
  pointLat: number,
  pointLon: number,
  radiusKm: number
): boolean {
  const distance = calculateDistance(centerLat, centerLon, pointLat, pointLon);
  return distance <= radiusKm;
}

// Generate random coordinates within a radius (for demo purposes)
export function generateRandomCoordinates(
  centerLat: number,
  centerLon: number,
  radiusKm: number
): { latitude: number; longitude: number } {
  const radiusInDegrees = radiusKm / 111; // Approximate conversion
  
  const u = Math.random();
  const v = Math.random();
  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);
  
  const newLat = centerLat + y;
  const newLon = centerLon + x / Math.cos(toRadians(centerLat));
  
  return {
    latitude: Math.round(newLat * 1000000) / 1000000,
    longitude: Math.round(newLon * 1000000) / 1000000,
  };
}

// Estimate travel time based on distance (assuming average speed)
export function estimateTravelTime(distanceKm: number, modeOfTransport: 'walk' | 'bike' | 'car' = 'car'): string {
  const speeds = {
    walk: 5, // km/h
    bike: 15, // km/h
    car: 30, // km/h (urban average)
  };
  
  const speed = speeds[modeOfTransport];
  const timeHours = distanceKm / speed;
  const timeMinutes = Math.ceil(timeHours * 60);
  
  if (timeMinutes < 60) {
    return `${timeMinutes} min`;
  } else {
    const hours = Math.floor(timeMinutes / 60);
    const mins = timeMinutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
}

// Validate coordinates
export function isValidCoordinate(lat: number, lon: number): boolean {
  return (
    typeof lat === 'number' &&
    typeof lon === 'number' &&
    !isNaN(lat) &&
    !isNaN(lon) &&
    lat >= -90 &&
    lat <= 90 &&
    lon >= -180 &&
    lon <= 180
  );
}

// GeoJSON point creator
export function createGeoJSONPoint(lat: number, lon: number): { type: 'Point'; coordinates: [number, number] } {
  return {
    type: 'Point',
    coordinates: [lon, lat], // GeoJSON uses [longitude, latitude]
  };
}

// Provider matching score calculation
export interface ProviderLocation {
  id: string;
  latitude: number;
  longitude: number;
  rating: number;
  responseTimeMinutes: number;
  isAvailable: boolean;
  specializations: string[];
}

export interface MatchScore {
  providerId: string;
  distance: number;
  score: number;
  estimatedArrival: string;
}

export function calculateMatchScore(
  userLat: number,
  userLon: number,
  provider: ProviderLocation,
  requiredSpecialization?: string
): MatchScore {
  const distance = calculateDistance(userLat, userLon, provider.latitude, provider.longitude);
  
  // Proximity weight (closer = higher score, max 40 points)
  const proximityScore = Math.max(0, 40 - (distance * 4));
  
  // Availability weight (20 points if available)
  const availabilityScore = provider.isAvailable ? 20 : 0;
  
  // Rating weight (max 25 points)
  const ratingScore = (provider.rating / 5) * 25;
  
  // Response time weight (faster = higher score, max 10 points)
  const responseScore = Math.max(0, 10 - provider.responseTimeMinutes);
  
  // Specialization match (5 points if matches)
  const specializationScore = requiredSpecialization && 
    provider.specializations.includes(requiredSpecialization) ? 5 : 0;
  
  const totalScore = proximityScore + availabilityScore + ratingScore + responseScore + specializationScore;
  
  return {
    providerId: provider.id,
    distance,
    score: Math.round(totalScore * 10) / 10,
    estimatedArrival: estimateTravelTime(distance),
  };
}

// Sort providers by match score
export function rankProviders(
  userLat: number,
  userLon: number,
  providers: ProviderLocation[],
  maxDistanceKm: number = 10,
  requiredSpecialization?: string
): MatchScore[] {
  return providers
    .map(provider => calculateMatchScore(userLat, userLon, provider, requiredSpecialization))
    .filter(match => match.distance <= maxDistanceKm)
    .sort((a, b) => b.score - a.score);
}
