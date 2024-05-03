import express from 'express';
import { addNote, deleteNote, updateNote, getAllNotes, getUserNotes } from './notes.controller.js';



export const notesRouter = express.Router();

notesRouter.post('/', addNote)
notesRouter.put('/', updateNote)
notesRouter.delete('/', deleteNote)
notesRouter.get('/', getAllNotes)
notesRouter.get('/:createdBy', getUserNotes)