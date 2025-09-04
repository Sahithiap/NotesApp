import { Router } from 'express';
import Note from '../models/Note.js';
import auth from '../middleware/auth.js';

const router = Router();

/**
 * @route   GET /notes
 * @desc    Get all notes of the logged-in user
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   POST /notes
 * @desc    Create a new note
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const note = await Note.create({
      user: req.user.id,
      title,
      content,
    });

    res.status(201).json(note);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   PUT /notes/:id
 * @desc    Update a note
 * @access  Private
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;

    await note.save();
    res.json(note);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   DELETE /notes/:id
 * @desc    Delete a note
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
