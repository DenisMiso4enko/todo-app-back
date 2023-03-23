import { Schema, model } from 'mongoose'

const schema = new Schema({
	title: String,
	id: Number,
	isDone: Boolean
}, {timestamps: true})


export const todoModel = model('Todo', schema)