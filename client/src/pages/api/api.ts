import { apiClient } from "@/lib/axios";

export interface UploadResponse {
  id: string
  message: string
}

export interface Document {
  id: string
  filename: string
  status: string
}

export const uploadDocument = async (file: File): Promise<UploadResponse> => {
  try {
    const formData = new FormData()
    formData.append("file", file)
    const { data } = await apiClient.post<UploadResponse>(
      "/documents/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getDocuments = async (): Promise<Document[]> => {
  try {
    const { data } = await apiClient.get<Document[]>("/documents")
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
