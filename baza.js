const Sequelize = require("sequelize");
const sequelize = new Sequelize('tut8', 'root', '', {
   host: 'localhost', dialect: 'mysql',
   pool: {
       max: 5,
       min: 0,
       acquire: 30000,
       idle: 10000
   }
});

const db={};
db.Sequelize = Sequelize;  
db.sequelize = sequelize;

db.Grad = sequelize.define('Grad', {
    id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
   naziv: Sequelize.STRING,
   broj_stanovnika: Sequelize.INTEGER
});

sequelize.authenticate().then(()=>{
    console.log('Spojeno na  bazu podataka');
}).catch(err=>{
    console.error('Nije spojeno na bazu podataka zbog ',err);
})
module.exports=db;