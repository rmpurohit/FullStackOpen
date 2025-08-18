// Centralized Axios instance with sane defaults and a small error normalizer
import axios from 'axios';

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') // strip trailing slash
  ?? (window.location.origin + '/api/persons');          // default to proxy (/api/persons)

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

// Map backend { error, code } to a friendly shape
export function normalizeError(err) {
  const res = err?.response;
  const data = res?.data;

  return {
    status: res?.status ?? 0,
    code: data?.code ?? null,
    message:
      data?.error
      ?? err?.message
      ?? 'Request failed',
    raw: err,
  };
}
