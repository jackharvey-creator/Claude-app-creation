export interface JobLocation {
  id: string
  title: string
  office: string
  city: string
  state: string
  stateCode: string
  lat: number
  lng: number
  url: string
}

// Comparion Insurance office locations mapped to careers page
// Source: comparioninsurance.com/careers — update as new offices open
export const JOB_LOCATIONS: JobLocation[] = [
  { id: 'ca-los-angeles', title: 'Insurance Sales Agent', office: 'Los Angeles Office', city: 'Los Angeles', state: 'California', stateCode: 'CA', lat: 34.0522, lng: -118.2437, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'ca-san-francisco', title: 'Insurance Sales Agent', office: 'San Francisco Office', city: 'San Francisco', state: 'California', stateCode: 'CA', lat: 37.7749, lng: -122.4194, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'ca-san-diego', title: 'Insurance Sales Agent', office: 'San Diego Office', city: 'San Diego', state: 'California', stateCode: 'CA', lat: 32.7157, lng: -117.1611, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'tx-dallas', title: 'Insurance Sales Agent', office: 'Dallas Office', city: 'Dallas', state: 'Texas', stateCode: 'TX', lat: 32.7767, lng: -96.7970, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'tx-houston', title: 'Insurance Sales Agent', office: 'Houston Office', city: 'Houston', state: 'Texas', stateCode: 'TX', lat: 29.7604, lng: -95.3698, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'tx-austin', title: 'Insurance Sales Agent', office: 'Austin Office', city: 'Austin', state: 'Texas', stateCode: 'TX', lat: 30.2672, lng: -97.7431, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'tx-san-antonio', title: 'Insurance Sales Agent', office: 'San Antonio Office', city: 'San Antonio', state: 'Texas', stateCode: 'TX', lat: 29.4241, lng: -98.4936, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'fl-miami', title: 'Insurance Sales Agent', office: 'Miami Office', city: 'Miami', state: 'Florida', stateCode: 'FL', lat: 25.7617, lng: -80.1918, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'fl-orlando', title: 'Insurance Sales Agent', office: 'Orlando Office', city: 'Orlando', state: 'Florida', stateCode: 'FL', lat: 28.5383, lng: -81.3792, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'fl-tampa', title: 'Insurance Sales Agent', office: 'Tampa Office', city: 'Tampa', state: 'Florida', stateCode: 'FL', lat: 27.9506, lng: -82.4572, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'fl-jacksonville', title: 'Insurance Sales Agent', office: 'Jacksonville Office', city: 'Jacksonville', state: 'Florida', stateCode: 'FL', lat: 30.3322, lng: -81.6557, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'ny-new-york', title: 'Insurance Sales Agent', office: 'New York City Office', city: 'New York', state: 'New York', stateCode: 'NY', lat: 40.7128, lng: -74.0060, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'il-chicago', title: 'Insurance Sales Agent', office: 'Chicago Office', city: 'Chicago', state: 'Illinois', stateCode: 'IL', lat: 41.8781, lng: -87.6298, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'ga-atlanta', title: 'Insurance Sales Agent', office: 'Atlanta Office', city: 'Atlanta', state: 'Georgia', stateCode: 'GA', lat: 33.7490, lng: -84.3880, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'az-phoenix', title: 'Insurance Sales Agent', office: 'Phoenix Office', city: 'Phoenix', state: 'Arizona', stateCode: 'AZ', lat: 33.4484, lng: -112.0740, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'wa-seattle', title: 'Insurance Sales Agent', office: 'Seattle Office', city: 'Seattle', state: 'Washington', stateCode: 'WA', lat: 47.6062, lng: -122.3321, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'co-denver', title: 'Insurance Sales Agent', office: 'Denver Office', city: 'Denver', state: 'Colorado', stateCode: 'CO', lat: 39.7392, lng: -104.9903, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'nc-charlotte', title: 'Insurance Sales Agent', office: 'Charlotte Office', city: 'Charlotte', state: 'North Carolina', stateCode: 'NC', lat: 35.2271, lng: -80.8431, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'oh-columbus', title: 'Insurance Sales Agent', office: 'Columbus Office', city: 'Columbus', state: 'Ohio', stateCode: 'OH', lat: 39.9612, lng: -82.9988, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'nv-las-vegas', title: 'Insurance Sales Agent', office: 'Las Vegas Office', city: 'Las Vegas', state: 'Nevada', stateCode: 'NV', lat: 36.1699, lng: -115.1398, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'mn-minneapolis', title: 'Insurance Sales Agent', office: 'Minneapolis Office', city: 'Minneapolis', state: 'Minnesota', stateCode: 'MN', lat: 44.9778, lng: -93.2650, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'mo-kansas-city', title: 'Insurance Sales Agent', office: 'Kansas City Office', city: 'Kansas City', state: 'Missouri', stateCode: 'MO', lat: 39.0997, lng: -94.5786, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'tn-nashville', title: 'Insurance Sales Agent', office: 'Nashville Office', city: 'Nashville', state: 'Tennessee', stateCode: 'TN', lat: 36.1627, lng: -86.7816, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'va-virginia-beach', title: 'Insurance Sales Agent', office: 'Virginia Beach Office', city: 'Virginia Beach', state: 'Virginia', stateCode: 'VA', lat: 36.8529, lng: -75.9780, url: 'https://www.comparioninsurance.com/careers' },
  { id: 'ma-boston', title: 'Insurance Sales Agent', office: 'Boston Office', city: 'Boston', state: 'Massachusetts', stateCode: 'MA', lat: 42.3601, lng: -71.0589, url: 'https://www.comparioninsurance.com/careers' },
]

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

function haversineDistanceMiles(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 3958.8 // Earth radius in miles
  const dLat = degreesToRadians(lat2 - lat1)
  const dLng = degreesToRadians(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export interface NearestJobResult {
  job: JobLocation
  distanceMiles: number
}

export function findNearestJob(lat: number, lng: number): NearestJobResult {
  let nearest = JOB_LOCATIONS[0]
  let minDist = Infinity

  for (const job of JOB_LOCATIONS) {
    const dist = haversineDistanceMiles(lat, lng, job.lat, job.lng)
    if (dist < minDist) {
      minDist = dist
      nearest = job
    }
  }

  return { job: nearest, distanceMiles: Math.round(minDist) }
}

export async function resolveLocationFromIp(ip: string): Promise<{
  city: string
  state: string
  lat: number
  lng: number
} | null> {
  try {
    // Strip IPv6 prefix if present (e.g., ::ffff:1.2.3.4)
    const cleanIp = ip.replace(/^::ffff:/, '')
    const res = await fetch(`https://ipapi.co/${cleanIp}/json/`, {
      headers: { 'User-Agent': 'ComparionRecruitmentBot/1.0' },
    })
    if (!res.ok) return null
    const data = await res.json() as {
      city?: string
      region?: string
      latitude?: number
      longitude?: number
      error?: boolean
    }
    if (data.error || !data.latitude || !data.longitude) return null
    return {
      city: data.city ?? '',
      state: data.region ?? '',
      lat: data.latitude,
      lng: data.longitude,
    }
  } catch {
    return null
  }
}
