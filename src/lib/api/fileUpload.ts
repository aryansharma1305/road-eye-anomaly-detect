
// File upload related API functions

interface UploadFileResponse {
  success: boolean;
  fileId?: string;
  error?: string;
}

// Base URL for the Flask backend
const API_BASE_URL = 'http://localhost:5000/api';

// Upload a file (image or video) to the Flask backend
export const uploadFile = async (file: File, type: 'image' | 'video'): Promise<UploadFileResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to upload file');
    }
    
    return {
      success: true,
      fileId: data.fileId,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};
