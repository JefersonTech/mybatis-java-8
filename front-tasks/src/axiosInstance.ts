import axios, { AxiosRequestConfig } from "axios";
import { Http } from "./types/Http";

const URL = "http://localhost:8080";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const instance = axios.create({
  baseURL: URL,
  headers,
});

// Response interceptor for API calls
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // if ([401, 403].includes(error.response.status)) {
    //   window.location.href = "/logout";
    // }
    throw error;
  }
);

/**
 * Axios instance for main requests.
 */
export const axiosInstance: Http = {
  get: async <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => {
    const response = await instance.get(path, {
      ...config,
      params: params,
      headers,
    });
    return response.data as T;
  },
  post: async <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => {
    const response = await instance.post(
      path,
      { ...params },
      { ...config, headers }
    );
    return response.data as T;
  },
  put: async <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => {
    const response = await instance.put(path, params, {
      ...config,
      headers: {
        ...headers,
        ...config?.headers,
      },
    });
    return response.data as T;
  },
  patch: async <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => {
    const response = await instance.patch(path, params, {
      ...config,
      headers: {
        ...headers,
        ...config?.headers,
      },
    });
    return response.data as T;
  },
  delete: async <T>(
    path: string,
    params?: unknown,
    config?: AxiosRequestConfig
  ) => {
    const response = await instance.delete(path, {
      ...config,
      params: params,
      headers,
    });
    return response.data as T;
  },
};

/**
 * Update the main instance token.
 * @param newToken New token to update the main instance.
 */
export async function updateMainToken(newToken: string) {
  if (!newToken) {
    return;
  }

  instance.defaults.headers.common["authorization"] = `Bearer ${newToken}`;
}
