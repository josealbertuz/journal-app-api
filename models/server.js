const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const { handleError } = require('../errors/error-handler');
const jwt = require('express-jwt');
const cookieParser = require('cookie-parser');

class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT;


        this.paths = {
            auth : '/api/auth',
            user : '/api/user',
            task : '/api/task',
            note : '/api/note',
            uploads : '/api/uploads'
        }

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

        this.app.use(cookieParser());

        //allows validate JWT
        this.app.use(jwt({
            secret : process.env.PRIVATE_KEY,
            algorithms : ['HS256'],
            getToken : (req) => req.cookies.token
        }).unless({
            path : ['/api/auth/login', '/api/auth/signup', '/api/auth/google']
        }));

        //acts as a wildcard if no endpoint is provided
        this.app.use(express.static('public'));

    }

    dbConnection(){
        dbConnection();
    }


    routes(){

        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.user, require('../routes/user.routes'));
        this.app.use(this.paths.task, require('../routes/task.routes'));
        this.app.use(this.paths.note, require('../routes/note.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));

    }

    errors(){

        this.app.use(handleError);

    }
    
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Listen from port ${this.port}`);
        })
    }


}

module.exports = Server;