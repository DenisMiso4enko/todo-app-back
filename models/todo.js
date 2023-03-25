import { Schema, model } from 'mongoose'

const schema = new Schema({
	title: String,
	id: String,
	isDone: Boolean,
	data: String
})


export const todoModel = model('Todo', schema)