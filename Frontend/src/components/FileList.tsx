import React, { useState, useEffect } from 'react';
import { Files, Download, Trash2, FileText, Image, File, Calendar, HardDrive } from 'lucide-react';
import axios from 'axios';

interface FileItem {
  _id: string;
  filename: string;
  path: string;
  size: number;
  uploadDate?: string;
}

function FileList() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/files', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setFiles(res.data);
      } catch (err) {
        console.error('Error fetching files:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;

    setDeleteLoading(id);
    try {
      await axios.delete(`http://localhost:5000/api/files/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFiles(files.filter((file) => file._id !== id));
    } catch (err) {
      console.error('Error deleting file:', err);
    } finally {
      setDeleteLoading(null);
    }
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return (
          <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center shadow-inner">
            <FileText className="w-6 h-6 text-red-600" />
          </div>
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
        return (
          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-inner">
            <Image className="w-6 h-6 text-green-600" />
          </div>
        );
      case 'doc':
      case 'docx':
        return (
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-inner">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-inner">
            <File className="w-6 h-6 text-gray-600" />
          </div>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2);
  };

  if (loading) {
    return (
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 blur"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-inner mr-3">
                <Files className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Your Files</h2>
                <p className="text-sm text-gray-500">Loading your files...</p>
              </div>
            </div>
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-4 border border-gray-200/50 rounded-xl bg-gray-50/50">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="w-16 h-8 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 blur"></div>
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center shadow-inner mr-3">
                <Files className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Your Files</h2>
                <p className="text-sm text-gray-500">Manage and download your uploads</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 bg-gray-100/50 px-3 py-1 rounded-lg">
              <HardDrive className="w-4 h-4" />
              <span>{files.length} {files.length === 1 ? 'file' : 'files'}</span>
            </div>
          </div>

          {files.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Files className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No files yet</h3>
              <p className="text-gray-500 mb-6">Upload your first file to get started</p>
              <div className="inline-flex items-center space-x-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
                <Files className="w-4 h-4" />
                <span className="text-sm font-medium">Ready for your uploads</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {files.map((file) => (
                <div
                  key={file._id}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
                  <div className="relative flex items-center space-x-4 p-4 border border-gray-200/50 rounded-xl hover:bg-white/80 hover:border-gray-300/50 transition-all duration-300 backdrop-blur-sm">
                    {getFileIcon(file.filename)}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <a
                          href={`http://localhost:5000${file.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200 truncate group-hover:text-blue-600"
                        >
                          {file.filename}
                        </a>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <HardDrive className="w-3 h-3" />
                          <span>{formatFileSize(file.size)} MB</span>
                        </div>
                        {file.uploadDate && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(file.uploadDate)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <a
                        href={`http://localhost:5000${file.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-110"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => handleDelete(file._id)}
                        disabled={deleteLoading === file._id}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 transform hover:scale-110"
                        title="Delete"
                      >
                        {deleteLoading === file._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileList;