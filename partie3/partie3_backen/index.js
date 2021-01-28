                                
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const Person = require('./models/person')
const cors = require('cors')
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(bodyParser.json())
app.use(cors())

app.use(express.static('build'))
app.use(express.json())
//app.use(ogger)

app.use(requestLogger)

const mongoose = require('mongoose')
const { response } = require('express')
const url = 
  `mongodb+srv://patrice_2021:patrice_2021@cluster0.cmmta.mongodb.net/dbtest?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


let persons = [
        { 
          "name": "Arto Hellas", 
          "number": "040-123456",
          "id": 1
        },
        { 
          "name": "Ada Lovelace", 
          "number": "39-44-5323523",
          "id": 2
        },
        { 
          "name": "Dan Abramov", 
          "number": "12-43-234345",
          "id": 3
        },
        { 
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122",
          "id": 4
        }
      ]

      app.get('/',(request,response) => {
        response.send('<h1> Hello Word !</h1>')
    })

    app.get('/api/persons', (request, response) => {
      Person.find({}).then(persons => {
        response.json(persons.map(person => person.toJSON()))
      })
       
        })

   
    const generaleId =  () => {
    const maxId = persons.length > 0
     ? Math.random(...persons.map(n => n.id))
     :0
     return maxId +1
    }

  console.log('general', generaleId())

    app.post('/api/persons', (request, response,next) => {
      const body = request.body
      console.log('body',body)

        if(body.name === undefined){
          return response.status(400).json({error:'name missing'})
        }
       const person = new Person({
         name : body.name,
         number:body.number,
       })
       person.save()
       .then(savedPerson =>  savedPerson.toJSON())
       .then(savedQndFormattedPerson =>{
         response.json(savedQndFormattedPerson)
       })
      .catch(error => next(error))
    })
    console.log('pers',persons)

    app.put('/api/persons/:id', (request, response, next) => {
      const body = request.body
    
      const person = {
        number: body.number,
      }
      Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
          response.json(updatedPerson)
        })
        .catch(error => {
          next(error)
          console.log(error.response.data)
        }) 
    })

const errorHandler = (error,request,response,next) => {
  console.error(error.message);
    if(error.name === 'castError'){
      return response.status(400).send({error:'malformatted id' })
    }else if(error.name === 'validationError'){
      return response.status(400).json({error:error.message })
    }
    next(error)
 }
  app.use(errorHandler)  


    app.get('/api/persons/:id', (request , response,next) => {
      Person.findById(request.params.id)
      .then(person => {
        if(person){
          response.json(person.toJSON())
        }
        else{
          response.status(404).end()
        }
       })
       .catch(error =>next(error))
       })

    app.delete('/api/persons/:id', (request, response) => {
      console.log('resquest',request.params.id)
      Person.findByIdAndRemove(request.params.id)
      .then(result =>{
        response.status(204).end()
      })
      .catch(error => next(error)) 
    })

    const unknownEndpoint = (request,response) => {
      response.status(404).send({ error:'unknown endpoint' })
    }
    app.use(unknownEndpoint)
     const PORT = process.env.PORT 
     app.listen(PORT, () => {
         console.log(`server runing on port ${PORT}`)
     } )
     

 /* app.get('/',(request,response) => {
      response.send('<h1> Hello Word !</h1>')
  })

  let userconte = 1;
  app.get('/info',(request,response) =>{
     // response.json(info)
     
     
     let date_gmt = new Date();
     let datenb ='' 
    let datActuelle = date_gmt.toString();
   
    userconte ++
    
     const message ='phonebook  has for ' + userconte  + ' people' 
     response.send( '<p>'+ message + ' </p>'+ '<p>'+ datActuelle +'</p>')   
      console.log('request',request)
  })
   const PORT = 3003 
   app.listen(PORT,() => {
       console.log(`server runing on port ${PORT}`)
   } )*/
   