import { useState } from "react";
import { Upload } from "lucide-react";

const ChatBot = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const handleFile = (file) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    
        if (file && !allowedTypes.includes(file.type)) {
            setError("Please upload a valid image (JPEG/PNG).");
            setSelectedFile(null);
            setPreview(null);
            return;
        }
    
        if (file && file.size > maxSize) {
            setError("File is too large. Please upload an image smaller than 10MB.");
            setSelectedFile(null);
            setPreview(null);
            alert("The image file is too large. Please upload an image smaller than 10MB.");
            return;
        }
    
        if (file) {
            setSelectedFile(file);
            setError(null);
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        }
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedFile) {
            setError("Please select an image!");
            return;
        }
    
        setLoading(true);
        setError(null);
        setResponse(null);
    
        const formData = new FormData();
        formData.append("file", selectedFile);
    
        try {
            // Get CSRF token from cookie if using Django's CSRF protection
            const csrfToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('csrftoken='))
                ?.split('=')[1];
    
            const res = await fetch("http://localhost:8000/predict-sign/predict/", {
                method: "POST",
                body: formData,
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                mode: 'cors',
            });
    
            if (!res.ok) {
                const errorText = await res.text();
                console.error('Server response:', errorText);
                throw new Error(`Server error: ${res.status}`);
            }
    
            const data = await res.json();
            console.log('Response data:', data);
    
            if (data.class_name) {
                setResponse(data.class_name);
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Error:", error);
            setError(error.message || "Failed to process the image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-16 px-4">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-6">Traffic Sign Detection Bot</h1>
                <p className="text-gray-600 mb-8">
                    Upload an image of a traffic sign to analyze it using our AI system.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div 
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                    />
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center"
                    >
                        <Upload className="h-12 w-12 text-gray-400 mb-3" />
                        <span className="text-sm text-gray-600">
                            Click to upload or drag and drop
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                            PNG, JPG up to 10MB
                        </span>
                    </label>
                </div>

                {preview && (
                    <div className="mt-4">
                        <img
                            src={preview}
                            alt="Preview"
                            className="max-h-64 mx-auto rounded-lg"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    disabled={loading || !selectedFile}
                >
                    {loading ? "Analyzing..." : "Analyze Traffic Sign"}
                </button>
            </form>

            {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {response && !error && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                    Detected Sign: {response}
                </div>
            )}
        </div>
    );
};

export default ChatBot;