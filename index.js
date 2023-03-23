import express from 'express'
import cors from 'cors'
import config from 'config'
import chalk from "chalk";
import mongoose from "mongoose";
import {todoRouter} from "./routes/todo.js";

const app = express()

const PORT = config.get('port') || 3000
const MONGO_URL = config.get('mongoURL')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/todos', todoRouter)

async function start() {
	try {
		await mongoose.connect(MONGO_URL)
		console.log(chalk.green('DB connected'))
		app.listen(PORT, () => {
			console.log(chalk.green(`server started on port ${PORT}...`))
		})
	} catch (e) {
		console.log(chalk.red(e.message))
		process.exit(1)
	}
}
start()
