import { Document } from 'mongoose'

export interface ProjetoBase {
	titulo: string
	data: Date
	situacao: string
	assunto: string
	autor: string
	ementa: string
}

export interface ProjetoDocument extends ProjetoBase, Document {}
