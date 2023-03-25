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
    console.log(e.message)
    res.status(500).json({ message: "Server error" });
  }
});

todoRouter.post("/post", async (req, res) => {
  try {
    const newList = req.body;
    const list = await todoModel.insertMany(newList);
    res.status(200).json(list);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Server error" });
  }
});

// todoRouter.delete("/delete", async (req, res) => {
//   try {
//     const { id } = req.body;
//     await todoModel.deleteOne({ id });
//     res.status(202).json({ message: "todo was deleted" });
//   } catch (e) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// todoRouter.patch('/checked', async (req, res) => {
// 	try {
// 		const { id, checked } = req.body
// 		await todoModel.findOneAndUpdate({id}, {isDone: checked})
// 		res.status(202).json({message: 'todo was updated'})
// 	} catch (e) {
// 		res.status(500).json({message: 'Server error'})
// 	}
// })
