# E-commerce MERN_SHOP

[demo](https://murmuring-fjord-30325.herokuapp.com/)

## INSTALL GUIDE

pre-Requirements:

- docker on your system
- create .env file in root directory (server)
- copy from .env-example

##### In Development Mode :

Run the app using :

`$ docker-compose up --build`

The App should be App :

visit client : http://localhost:3000

visit server : http://localhost:8080

To check the status :

`docker ps`

##### In Production Mode :

First copy the content of **docker-compose-prod.yml** to **docker-compose.yml**

Run the app using :

` $ docker-compose up --build -remove-orphans`

The App should be up at http://localhost:8080

## STACK

- current CRA_react-app v3.4.1 / react v16.13.1
- nodejs 12-alpine (see docker file)
- express
- mongodb local (no-sql database)
- mongooose v5.10.0

## USEFULL COMANDS && UPDATE PACKAGE

- `docker ps`
- `docker exec -it <container_id> sh`
- `npm update`

## TEST API CONNECTION

Manual test

- install rest api client (vscode extension) / or use postman
- test api call using rest client (api_call directory)

Automatic test

- run docker-compose
- hit `docker exec -it <cont it> sh`
- run `npm run test`


Before deploy:
Dockerfile in your root folder

Heroku deploy command:


heroku logi:
heroku container:login

heroku create 

heroku container:push web   
heroku container:release web
