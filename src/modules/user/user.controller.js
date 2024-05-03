import jwt from "jsonwebtoken";
import { userModel } from "../../../databases/models/user.model.js";
import bcrypt from "bcrypt";



export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return res.json({ message: "user already exists" });
  } else {
    const hash = bcrypt.hashSync(password, 8);
    await userModel.insertMany({ name, email, password: hash });
    res.json({ message: "success" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  let TOKEN = jwt.sign({id: user.id, name: user.name}, 'mySecretPassword')
  if (user && bcrypt.compareSync(password, user.password)) {
    res.json({ message: "success login", TOKEN });
  } else {
    res.json({ message: "vrify you login & password" });
  }
};
