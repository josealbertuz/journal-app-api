const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const { handleError } = require('../errors/error');
const { validateJWT } = require('../middlewares/validate-jwt');

class Server {


    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.middleware();

        this.dbConnection();

        this.routes();

        this.errors();
    }

    middleware(){

        //cors allows different servers to connect among them
        this.app.use(cors());

        //allows to parse json requests
        this.app.use(express.json());

        //acts as a wildcard if no endpoint is provided
        this.app.use(express.static('public'));

    }

    async dbConnection(){
        await dbConnection();
    }


    routes(){

        this.app.use('/api/auth', require('../routes/auth.routes'));

        //this functions prevents from users access to routes if they are not authorized
        //They only can access to auth route

        this.jwtValidator();

        this.app.use('/api/user', require('../routes/user.routes'));
        this.app.use('/api/task', require('../routes/task.routes'));
        this.app.use('/api/note', require('../routes/note.routes'));

    }

    errors(){

        this.app.use(handleError);

    }

    jwtValidator(){
        this.app.use(validateJWT);
    }

    
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Listen from port ${this.port}`);
        })
    }


}

module.exports = Server;