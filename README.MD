Como rodar nosso sistema:
</br>
- É o preciso instalar os seguintes aplicativos (node, yarn e docker)
</br>
- Criar um banco de dados postgres > "docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres"
</br>
- Agora dentro da pasta do sistema no backend, crie nossas tabelas no banco > "yarn sequelize db:migrate>
</br>
- Instale todas dependências > "yarn install"
</br>
- Iniciar o servidor > "yarn start"
</br>
- Rodar os testes > "yarn test"