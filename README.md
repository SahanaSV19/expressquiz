# expressquiz
## Requirements
- Node v20.9.0 (https://nodejs.org/en/download)
- Mysql (https://dev.mysql.com/downloads/installer/)

## Steps
- clone the repo
- run "npm install" to install packages

## To start the server
### To run in development env
- node --watch index.js --port=3000 --username=root --password=mpxfactor --dbname=test --dev=true 
### To run
- node index.js --port=3000 --username=root --password=mpxfactor --dbname=test --dev=true 
#### Arguments
- port => give port number where server should run.
- username => give proper dbms username.
- password => give proper dbms password.
- dbname => give proper database name.
- if dev=true => it deletes all the data from the database and creates admin user and seeds the database with example values.

## Admin
- username => "nanu"
- email => "wtf@gmail.com"
- password => "neenu"

## Swagger
- http://localhost:3000/rest-api/
- give proper port number    

# Client Example
- cd to clientexample and run live server (runs on ports 5500, 3000, if you use any you will get cors error) 

# ToDo
- [ ] Add errors properly.
- [ ] Add Swagger docs
    - [x] user route
    - [ ] question route
    - [ ] choice route
    - [ ] userAnswer route
- [ ] Controller and routes
    - [ ] get all quizzes with questions and choices.
- [ ] Refactor code
    - [ ] separate service and controller logic.
- [ ] Migrate project to typescript
- [ ] Create Single executable file.
