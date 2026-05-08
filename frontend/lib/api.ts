import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth
export async function login(payload: { email: string; password: string }) {
  const response = await api.post('/auth/login', payload);
  return response.data;
}

export async function register(payload: { email: string; password: string; full_name: string; organization: string; role: string }) {
  const response = await api.post('/auth/register', payload);
  return response.data;
}

// Uploads
export async function uploadWasteFile(file: File) {
  const form = new FormData();
  form.append('file', file);
  const response = await axios.post(`${API_URL}/uploads/file`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

// Dashboard
export async function fetchDashboard() {
  const response = await api.get('/workspace/dashboard');
  return response.data;
}

// Marketplace
export async function fetchMarketplaceListings() {
  const response = await api.get('/marketplace/listings');
  return response.data;
}

// Product Lab - generate concepts
export async function generateProductConcepts(payload: { material_type: string; volume_tons: number }) {
  const response = await api.post('/workspace/generate-concepts', payload);
  return response.data;
}

// Water Twin - telemetry
export async function fetchWaterTelemetry() {
  const response = await api.get('/workspace/water-twin');
  return response.data;
}

// Health check
export async function healthCheck() {
  const response = await api.get('/health');
  return response.data;
}
