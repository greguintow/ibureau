import mongoose from 'mongoose'
import fetch from 'node-fetch'
import cheerio from 'cheerio'
import getValues from './utils'
import { MONGODB_URL, DB_OPTIONS } from './config'

/**
 * Essa função é usada para buscar palavras chaves dentro de um site de Projetos de Lei e guardar os resultados dentro do MongoDB
 * @param id Representa o id do município desejado
 * @param search Representa a string a ser procurada
 */
async function main(id = 20, search = 'transporte') {
	await mongoose.connect(MONGODB_URL, DB_OPTIONS)
	const res = await fetch(
		`http://www.legislador.com.br/LegisladorWEB.ASP?WCI=ProjetoTramite&ID=${id}&dsVerbete=${search}`
	)
	if (res.ok) {
		const result = await res.text()
		const $ = cheerio.load(result)
		$('div[class=card]').each(async function () {
			const str = $(this).find('a').first().attr('onclick')
			if (str) {
				const valores = str
					.slice(str.indexOf('(') + 1, str.indexOf(')'))
					.split(',')
				try {
					await getValues(
						`http://www.legislador.com.br/LegisladorWEB.ASP?WCI=ProjetoTexto&ID=${valores[0]}&inEspecie=${valores[1]}&nrProjeto=${valores[2]}&aaProjeto=${valores[3]}`
					)
				} catch (error) {
					console.log(error.message)
				}
			}
		})
	}
}

main()
