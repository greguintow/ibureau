# Teste iBureau

Esse foi um teste realizado para a empresa iBureau de web scrapping utilizando as seguintes tecnologias:
- Node.js
- TypeScript (linguagem para a tipagem do javascript)
- Cheerio (biblioteca para fazer scrapping)
- MongoDB (banco de dados)

O nome do banco de dados local é ibureau, mas é apenas utilizado no modo de desenvolvedor, caso utilize o `yarn start` utilizará banco de dados externo informado dentro do arquivo `.env`

1. `yarn` ( `npm install` se preferir )
2. `yarn dev`, utilizará o banco de dados local ( `npm run dev` se preferir )
3. `yarn start`, utilizará o banco de dados externo ( `npm start` se preferir )
4. `yarn test`, executará o teste em um banco de dados mondogb por memória utilizando jest ( `npm run test` se preferir )
