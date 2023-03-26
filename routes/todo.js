import { Router } from "express";
import { todoModel } from "../models/todo.js";

export const todoRouter = Router();

todoRouter.get("/", async (req, res) => {
  try {
    const list = await todoModel.find();
    if (list) {
      res.status(200).json(list);
    } else {
      res.status(400).json({ message: "Todos not found" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Server error" });
  }
});

todoRouter.post("/post", async (req, res) => {
  try {
    const newList = req.body;
    await todoModel.insertMany(newList);
    const todoList = await todoModel.find();
    res.status(200).json(todoList);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Server error" });
  }
});

todoRouter.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await todoModel.deleteOne({ id });
    const todoList = await todoModel.find();
    res.status(202).json({ message: "todo was deleted", body: todoList });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

todoRouter.patch("/checked", async (req, res) => {
  try {
    const { id, isDone } = req.body;
    await todoModel.findOneAndUpdate({ id }, { isDone });
    const todoList = await todoModel.find();
    res.status(202).json({ message: "todo was updated", body: todoList });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

todoRouter.patch("/updateTitle", async (req, res) => {
  try {
    const { id, title } = req.body;
    await todoModel.findOneAndUpdate({ id }, { title });
    const todoList = await todoModel.find();
    res.status(202).json({ message: "todo was updated", body: todoList });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});
