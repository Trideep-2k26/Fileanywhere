import React from 'react';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';
import { Upload, Files, Shield, TrendingUp } from 'lucide-react';

function Dashboard() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Files className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-600">Manage your files and uploads</p>
            </div>
          </div>
        </div>



        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* File Upload */}
          <div className="lg:col-span-1">
            <FileUpload />
          </div>

          {/* File List */}
          <div className="lg:col-span-2">
            <FileList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;