import React, { useState } from 'react';
import axios from 'axios';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formatUrl = (input) => {
    if (input.startsWith('http://') || input.startsWith('https://')) {
      return input;
    }
    return `http://${input}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setIsLoading(true);
    
    const formattedUrl = formatUrl(url);

    try {
      const response = await axios.post('http://localhost:8000/api/analyze/', { url: formattedUrl });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      // Update the error state with a relevant error message
      const errorMessage = error.response?.data?.error || 'An error occurred while analyzing the URL';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">PhishGuard AI</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to analyze"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </form>
        {error && (
          <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}
        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Result:</h2>
            <div className={`flex items-center ${result.is_phishing ? 'text-red-600' : 'text-green-600'}`}>
              {result.is_phishing ? (
                <XCircle className="h-5 w-5 mr-2" />
              ) : (
                <CheckCircle className="h-5 w-5 mr-2" />
              )}
              <p className="font-medium">
                {result.is_phishing ? 'Potential Phishing Detected' : 'URL Appears Safe'}
              </p>
            </div>
            <p className="mt-2 text-gray-600">Confidence: {(result.confidence * 100).toFixed(2)}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
