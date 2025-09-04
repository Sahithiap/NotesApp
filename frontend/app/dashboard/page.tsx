// 📂 frontend/app/notes/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useRouter } from "next/navigation";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function NotesDashboard() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch notes
    const fetchNotes = async () => {
      try {
        const res = await axios.get("/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data);
      } catch (err) {
        console.error(err);
        router.push("/login"); // redirect if token invalid
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [router]);

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <h1 className="text-xl font-semibold text-gray-600">Loading notes...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Your Notes</h1>

        {notes.length === 0 ? (
          <p className="text-gray-500">You have no notes yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <div
                key={note._id}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <h2 className="font-semibold text-lg mb-2">{note.title}</h2>
                <p className="text-gray-700">{note.content}</p>
                <p className="text-gray-400 text-sm mt-2">
                  Created at: {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
