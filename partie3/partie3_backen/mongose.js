const mongoose = require('mongoose')
const uniqueValidator  =  require ( 'mongoose-unique-validator' ) ; 
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = 
  `mongodb+srv://patrice_2021:${password}@cluster0.cmmta.mongodb.net/dbtest?retryWrites=true&w=majority`

 
  mongoose.set('useNewUrlParser', true);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


const personSchema = new mongoose.Schema({
    name:{
      type:String,
      minlength:3,
      require:true
    } ,
    number:{
      type:String,
      minlength:8,
    }  
})
personSchema.plugin(uniqueValidator);
personSchema.set('validateBeforeSave', false)
personSchema.path('name').validate(value => {
  return value != null;
});
const Person = mongoose.model('person', personSchema)

const person = new Person({
    name:process.argv[3], 
    number: process.argv[4],  
})

person.save().then(response => {
  // eslint-disable-next-line semi
  console.log('person saved!');
  // eslint-disable-next-line semi
  mongoose.connection.close();
})

Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
  
