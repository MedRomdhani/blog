import jwt from "jsonwebtoken";
import { notesModel } from "../../../databases/models/notes.model.js";

export const addNote = (req, res) => {
  const { title, description, createdBy, token } = req.body;
  jwt.verify(token, "mySecretPassword", async (err, decoded) => {
    if (err) {
      res.json({ message: "Invalid Token", err });
    } else {
      await notesModel.insertMany({ title, description, createdBy });
      res.json({ message: "success", token });
    }
  });
};

export const updateNote = async (req, res) => {
  const { title, description, id } = req.body;
  // await notesModel.updateOne(
  //   { createdBy: "6633d1ae60444456ca96d77d" },
  //   { title: "Nextjs replaced" }
  // );
  let note = await notesModel.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  );
  if (note) {
    res.json({ message: "success", note });
  } else {
    res.json({ message: "note not found" });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.body;
  let note = await notesModel.findByIdAndDelete(id);
  if (note) {
    res.json({ message: "success", note });
  } else {
    res.json({ message: "note not found" });
  }
};

export const getAllNotes = async (req, res) => {
  let token = req.header('token');
  console.log(token);
  let note = await notesModel.find({}).populate("createdBy", "name-_id");
  res.json({ message: "success", note });
};
export const getUserNotes = async (req, res) => {
  const { createdBy } = req.params;
  let note = await notesModel.find({ createdBy });
  res.json({ message: "success", note });
};
