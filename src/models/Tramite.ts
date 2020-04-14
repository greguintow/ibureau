import mongoose, { Schema } from 'mongoose'
import { TramiteDocument } from '../types'

const tramiteSchema = new Schema({
	projeto: {
		type: String,
		required: true
	},
	entrada: {
		type: Date,
		required: true
	},
	assunto: Date,
	autor: Date,
	projetoLei: {
		type: Schema.Types.ObjectId,
		ref: 'projeto'
	}
})

const Tramite = mongoose.model<TramiteDocument>('tramite', tramiteSchema)

export default Tramite
