// 📂 frontend/app/components/NoteCard.tsx
"use client";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  onDelete?: (id: string) => void;
}

export default function NoteCard({ id, title, content, createdAt, onDelete }: NoteCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow relative">
      <h2 className="font-semibold text-lg mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{content}</p>
      <p className="text-gray-400 text-sm">
        Created at: {new Date(createdAt).toLocaleString()}
      </p>

      {onDelete && (
        <button
          onClick={() => onDelete(id)}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm font-medium"
        >
          Delete
        </button>
      )}
    </div>
  );
}
