docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
</br>
yarn sequelize db:migrate
</br>
Dentro da pasta você irá rodar: yarn install (para instalar as dependências)
</br>
E depois irá rodar: yarn start (para iniciar o backend)
