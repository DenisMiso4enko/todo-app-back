import { Router } from "express"
import {todoModel} from "../models/todo.js";


export const todoRouter = Router()


todoRouter.get('/', async (req, res) => {
	try {
		const list = await todoModel.find()
		if (list) {
			res.status(200).json(list)
		} else {
			res.status(400).json({message: 'Todos not found'})
		}
	} catch (e) {
		res.status(500).json({message: 'Server error'})
	}
})


todoRouter.post('/create', async (req, res) => {
	try {
		const {id, title, isDone} = req.body
		const doc = await todoModel.create({
			id,
			title,
			isDone
		})
		const newTodo = await doc.save()
		res.status(201).json(newTodo)
	} catch (e) {
		res.status(500).json({message: 'Server error'})
	}
})

todoRouter.delete('/delete', async (req, res) => {
	try {
		const { id } = req.body
		await todoModel.deleteOne({id})
		res.status(202).json({message: 'todo was deleted'})
	} catch (e) {
		res.status(500).json({message: 'Server error'})
	}
})

todoRouter.patch('/checked', async (req, res) => {
	try {
		const { id, checked } = req.body
		await todoModel.findOneAndUpdate({id}, {isDone: checked})
		res.status(202).json({message: 'todo was updated'})
	} catch (e) {
		res.status(500).json({message: 'Server error'})
	}
})