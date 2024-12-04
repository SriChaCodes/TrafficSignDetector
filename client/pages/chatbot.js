import { useState } from "react";

const ChatBot = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            alert("Please select an image!");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const res = await fetch("http://127.0.0.1:8000/api/upload/", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setResponse(data.message);
            } else {
                setResponse(data.error || "Something went wrong.");
            }
        } catch (error) {
            console.error("Error:", error);
            setResponse("Failed to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="custom-screen py-16 text-center">
            <h1 className="text-3xl font-semibold mb-6">Traffic Sign Detection Bot</h1>
            <p className="text-gray-600 mb-8">
                Upload an image of a traffic sign to analyze it using our AI system.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full border border-gray-300 rounded p-2"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Upload and Detect"}
                </button>
            </form>
            {response && (
                <div className="mt-6 p-4 border rounded bg-gray-100 text-gray-800">
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
