import getValues from '../utils'

describe('Pegar valores de uma página', () => {
	it('Deveria criar os documentos', async () => {
		try {
			await getValues(
				'http://www.legislador.com.br/LegisladorWEB.ASP?WCI=ProjetoTexto&ID=20&inEspecie=1&nrProjeto=25&aaProjeto=2020&dsVerbete=transporte'
			)
		} catch (error) {
			expect(error).not.toBeDefined()
		}
	})
})
