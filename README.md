# be-kurikulum

1. express -h -> express --no-view nameproject
2. install nodemon, for hot reload https://www.npmjs.com/package/nodemon
3. install dotenv, https://www.npmjs.com/package/dotenv, and add file dotenv
4. install sequelize for get data, delete data, read data, https://sequelize.org/docs/v6/getting-started/ and install sequlieze cli
   -> there is another orm, https://www.prisma.io/docs/getting-started
   -> npx sequelize to check how to make db like model, migrate, seeder
   -> (1) npx sequelize init for initiation project
   -> (2) settings config.js
   -> (3) create migration file : npx sequelize migration:create --name create-user-table
   -> (4) install mysql : npm install mysql2 --save
   -> (5) make model object
   -> (6) install fastest validator : npm i fastest-validator, https://www.npmjs.com/package/fastest-validator
   -> (7) if make model then use router in app.js then : npx sequelize db:migrate
   -> (8) delete migration npx sequelize db:migrate:undo --name fileMigrationName
   -> (9) npm i jsonwebtoken for using jsonwebtoken in login
