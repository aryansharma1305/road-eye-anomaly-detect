
import React, { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Image, Video, AlertTriangle, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FileData {
  file: File;
  preview: string;
  type: 'image' | 'video';
}

const UploadSection: React.FC = () => {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>, type: 'image' | 'video') => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0], type);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0], type);
    }
  };

  const handleFileSelection = (file: File, type: 'image' | 'video') => {
    const isImage = type === 'image' && file.type.startsWith('image/');
    const isVideo = type === 'video' && file.type.startsWith('video/');
    
    if ((type === 'image' && !isImage) || (type === 'video' && !isVideo)) {
      alert(`Please select a valid ${type} file.`);
      return;
    }
    
    const preview = URL.createObjectURL(file);
    setFileData({ file, preview, type });
  };

  const removeFile = () => {
    if (fileData?.preview) {
      URL.revokeObjectURL(fileData.preview);
    }
    setFileData(null);
  };

  const renderFilePreview = () => {
    if (!fileData) return null;
    
    return (
      <div className="relative mt-4 p-2 border rounded-lg">
        <button 
          onClick={removeFile}
          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
        
        {fileData.type === 'image' ? (
          <img 
            src={fileData.preview} 
            alt="Preview" 
            className="w-full h-auto max-h-56 object-contain rounded-md"
          />
        ) : (
          <video 
            src={fileData.preview}
            controls
            className="w-full h-auto max-h-56 object-contain rounded-md"
          />
        )}
        
        <p className="mt-2 text-sm text-gray-500 truncate">
          {fileData.file.name} ({Math.round(fileData.file.size / 1024)} KB)
        </p>
      </div>
    );
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Upload className="h-6 w-6 text-roadapp-purple" />
          Upload Road Data
        </CardTitle>
        <CardDescription>
          Upload images or videos of road anomalies for detection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="image" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="image" className="flex items-center gap-1">
              <Image className="h-4 w-4" />
              Image
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              Video
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="image">
            <div
              className={`file-drop-area ${isDragging ? 'active' : ''} ${fileData && fileData.type === 'image' ? 'border-primary' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => handleFileDrop(e, 'image')}
              onClick={() => fileInputRef.current?.click()}
            >
              {fileData && fileData.type === 'image' ? (
                renderFilePreview()
              ) : (
                <>
                  <Image className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-base font-medium">
                    Drag and drop an image, or{' '}
                    <span className="text-roadapp-purple hover:underline">browse</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Supported formats: JPG, PNG, JPEG (Max: 10MB)
                  </p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/jpg"
                onChange={(e) => handleFileChange(e, 'image')}
              />
            </div>
            
            <div className="mt-4 text-sm text-gray-500 flex items-start">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500 shrink-0" />
              <p>
                Please upload a clear image of the road. Blurry images may reduce detection accuracy.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="video">
            <div
              className={`file-drop-area ${isDragging ? 'active' : ''} ${fileData && fileData.type === 'video' ? 'border-primary' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => handleFileDrop(e, 'video')}
              onClick={() => videoInputRef.current?.click()}
            >
              {fileData && fileData.type === 'video' ? (
                renderFilePreview()
              ) : (
                <>
                  <Video className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-base font-medium">
                    Drag and drop a video, or{' '}
                    <span className="text-roadapp-purple hover:underline">browse</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Supported formats: MP4, MOV, AVI (Max: 100MB)
                  </p>
                </>
              )}
              <input
                ref={videoInputRef}
                type="file"
                className="hidden"
                accept="video/mp4,video/quicktime,video/x-msvideo"
                onChange={(e) => handleFileChange(e, 'video')}
              />
            </div>
            
            <div className="mt-4 text-sm text-gray-500 flex items-start">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500 shrink-0" />
              <p>
                Short videos give better results. Videos longer than 2 minutes may take longer to process.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UploadSection;
