//npm run test >>> jest
//npm run dev >>> nodemon index.js
// npm run start >>> node index.js

https://sequelize.org/docs/v6/getting-started/

npm i sequelize pg sqlite3

CREATE TABLE IF NOT EXISTS "orders" ("id" SERIAL , "name" VARCHAR(255) NOT NULL, "customerId" INTEGER NOT NULL REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
