// 📂 frontend/app/components/NoteEditor.tsx
"use client";

import { useState } from "react";
import axios from "../../utils/axios";

interface NoteEditorProps {
  onSave?: () => void; // callback after saving
}

export default function NoteEditor({ onSave }: NoteEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      await axios.post(
        "/notes",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle("");
      setContent("");
      if (onSave) onSave(); // refresh notes list
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to save note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSave}
        disabled={loading}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Note"}
      </button>
    </div>
  );
}
