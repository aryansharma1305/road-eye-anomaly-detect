
// Anomaly detection related API functions

interface DetectionResult {
  success: boolean;
  fileId?: string;
  detections?: {
    potholes: number;
    cracks: number;
    severityScore: number;
    processedImageUrl?: string;
  };
  error?: string;
}

// Base URL for the Flask backend
const API_BASE_URL = 'http://localhost:5000/api';

// Detect anomalies in the uploaded file
export const detectAnomalies = async (fileId: string, location: string): Promise<DetectionResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/detect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileId,
        location,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to detect anomalies');
    }
    
    return {
      success: true,
      fileId: data.fileId,
      detections: data.detections,
    };
  } catch (error) {
    console.error('Error detecting anomalies:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};
