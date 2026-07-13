import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios"

class ApiClient {
  private readonly instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    })
    
    this.initializeRequestInterceptor()
    this.initializeResponseInterceptor()
  }

  private initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access_token")

        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      (error: AxiosError) => Promise.reject(error)
    )
  }

  private initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Clear auth data
          localStorage.removeItem("access_token")

          // Redirect to login
          window.location.href = "/login"
        }

        return Promise.reject(error)
      }
    )
  }

  public get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get(url, config)
  }

  public post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post(url, data, config)
  }

  public put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put(url, data, config)
  }

  public patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch(url, data, config)
  }

  public delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete(url, config)
  }

  public get client() {
    return this.instance
  }
}

export const apiClient = new ApiClient()
