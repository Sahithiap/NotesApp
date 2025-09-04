import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",       // Reference to User model
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
  },
  { timestamps: true }   // Adds createdAt & updatedAt automatically
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
