import { Document } from 'mongoose'
import { ProjetoDocument } from './projeto'

export interface TramiteBase {
	projeto: string
	entrada: Date
	prazo?: Date
	devolucao?: Date
	projetoLei: ProjetoDocument['_id']
}

export interface TramiteDocument extends TramiteBase, Document {
	projetoLei: ProjetoDocument['_id']
}
