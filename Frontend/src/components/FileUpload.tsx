import React, { useState, useRef } from 'react';
import { Upload, Plus, File, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage('');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setMessage('Please select a file');

    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    setUploadProgress(0);

    try {
      const res = await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setUploadProgress(percentCompleted);
        }
      });
      setMessage(res.data.message);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error uploading file');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2);
  };

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl opacity-20 blur"></div>
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-inner mr-3">
              <Upload className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Upload File</h2>
              <p className="text-sm text-gray-500">Drag and drop or click to select</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Drag and Drop Area */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-blue-400 bg-blue-50/50 scale-105'
                  : file
                  ? 'border-green-400 bg-green-50/50'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="space-y-4">
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  file ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {file ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <Plus className="w-8 h-8 text-gray-400" />
                  )}
                </div>

                {file ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <File className="w-5 h-5 text-gray-600" />
                      <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                    </div>
                    <p className="text-xs text-gray-500">{getFileSize(file.size)} MB</p>
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Ready to upload</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <button
                        type="button"
                        onClick={onButtonClick}
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                      >
                        Click to upload
                      </button>{' '}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG, DOC up to 10MB</p>
                  </div>
                )}
              </div>

              {dragActive && (
                <div className="absolute inset-0 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <div className="text-blue-600 font-medium">Drop your file here</div>
                </div>
              )}
            </div>

            {/* Upload Progress */}
            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Uploading...</span>
                  <span className="text-gray-900 font-medium">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Upload Button */}
            <button
              type="submit"
              disabled={uploading || !file}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              {uploading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Uploading... {uploadProgress}%
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload File
                </div>
              )}
            </button>
          </form>

          {/* Message */}
          {message && (
            <div className={`mt-4 p-3 rounded-xl backdrop-blur-sm ${
              message.includes('successfully') || message.includes('uploaded')
                ? 'bg-green-50/80 border border-green-200/50 text-green-700'
                : 'bg-red-50/80 border border-red-200/50 text-red-700'
            }`}>
              <div className="flex items-center justify-center">
                {message.includes('successfully') || message.includes('uploaded') ? (
                  <CheckCircle className="w-4 h-4 mr-2" />
                ) : (
                  <AlertCircle className="w-4 h-4 mr-2" />
                )}
                <p className="text-sm text-center">{message}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUpload;