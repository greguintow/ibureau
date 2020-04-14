import fetch from 'node-fetch'
import cheerio from 'cheerio'
import { remove } from 'remove-accents'
import { ProjetoBase, TramiteBase } from './types'
import { Projeto, Tramite } from './models'

type TramiteType = Partial<TramiteBase>

type ProjetoType = Partial<ProjetoBase>

/**
 * Converte para YYYY-mm-dd
 * @param text Data no formato dd/mm/YYYY
 */
const convertToDate = (text: string) =>
	new Date(text.split('/').reverse().join('-'))

/**
 * Essa função é a resonsável por guardar o projeto de lei e as suas respectivas trâmites no MongoDB
 * @param url Url da página do projeto de lei
 */
const getValues = async (url: string) => {
	const res = await fetch(url)
	if (res.ok) {
		const result = await res.textConverted()
		const $ = cheerio.load(result)
		let projeto: ProjetoType = {
			titulo: $('.card-title').first().text(),
			ementa: $('.card-text').first().text().trim()
		}
		$('.col-sm-3').each(function () {
			const nome = remove($(this).text()).toLowerCase()
			switch (nome) {
				case 'regime':
					break
				case 'tramite':
					projeto = {
						...projeto,
						data: convertToDate($(this).next().text())
					}
					break
				case 'autor':
					projeto = {
						...projeto,
						autor: $(this)
							.next()
							.text()
							.replace(
								$(this).next().after('br').html()?.split('<br>')[0] || '',
								''
							)
					}
					break
				default:
					projeto = {
						...projeto,
						[nome]: $(this).next().text()
					}
					break
			}
		})
		const tramites: TramiteType[] = []
		$('tbody tr').each(function () {
			let tramite: TramiteType = {}
			$(this)
				.children('td')
				.each(function (index) {
					switch (index) {
						case 0:
							tramite = {
								projeto: $(this).find('dt').text()
							}
							break
						default:
							const col = $(this).attr('info-col')
							if ($(this).text().trim() !== '' && typeof col !== 'undefined') {
								tramite = {
									...tramite,
									[remove(col).toLowerCase()]: convertToDate($(this).text())
								}
							}
							break
					}
					if (index === 3) tramites.push(tramite)
				})
		})
		const { _id: id } = await Projeto.create(projeto)
		await Tramite.insertMany(tramites.map(obj => ({ ...obj, projetoLei: id })))
	} else {
		throw new Error(`Houve um erro ao carregar a página ${url}`)
	}
}

export default getValues
