declare global {
  interface Window {
    __APP_CONFIG__?: {
      apiBaseUrl?: string;
    };
  }
}

const runtimeApiBaseUrl = window.__APP_CONFIG__?.apiBaseUrl?.trim();

export const API_BASE_URL =
  runtimeApiBaseUrl && !runtimeApiBaseUrl.startsWith('__')
    ? runtimeApiBaseUrl.replace(/\/+$/, '')
    : 'http://localhost:8080';

export const API_ENDPOINTS = {
  admin: `${API_BASE_URL}/admin`,
  users: `${API_BASE_URL}/users`,
  cars: `${API_BASE_URL}/cars`,
  sellcar: `${API_BASE_URL}/sellcar`,
  newCars: `${API_BASE_URL}/user/buy-new-car`,
  testDrive: `${API_BASE_URL}/testdrive`,
  payment: `${API_BASE_URL}/api/payment`
};

export const MEDIA_ENDPOINTS = {
  uploads: `${API_BASE_URL}/uploads`,
  carUploads: `${API_BASE_URL}/car-uploads`,
  carImages: `${API_BASE_URL}/cars/uploads`
};
