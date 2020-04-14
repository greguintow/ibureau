import mongoose, { Schema } from 'mongoose'
import { ProjetoDocument } from '../types'

const projetoSchema = new Schema({
	titulo: {
		type: String,
		required: true,
		validate: [
			{
				validator: async (titulo: string): Promise<boolean> =>
					!(await Projeto.exists({ titulo })),
				message: ({ value }) => `O projeto de lei ${value} já existe`
			}
		]
	},
	situacao: {
		type: String,
		required: true
	},
	assunto: {
		type: String,
		required: true
	},
	autor: {
		type: String,
		required: true
	},
	ementa: {
		type: String,
		required: true
	}
})

const Projeto = mongoose.model<ProjetoDocument>('projeto', projetoSchema)

export default Projeto
