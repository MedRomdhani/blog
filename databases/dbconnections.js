import mongoose from "mongoose";

export function dbConnection() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/PinguBlog")
    .then(() => {
      console.log("db connection established ✔");
    })
    .catch((err) => {
      console.log("Connection error" + err);
    });
}

