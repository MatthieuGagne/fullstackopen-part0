const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Expected syntax is : node mongo.js <password> : To list all persons.')
  console.log('Expected syntax is : node mongo.js <password> <name> <number>: To add a persons.')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

console.log(process.argv.toString)

const url =
  `mongodb+srv://mathdaman:${password}@cluster0.n7imt.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (newName && newNumber) {
  const person = new Person({
    name: newName,
    number: newNumber,
  })

  person.save().then(() => {
    console.log(`added ${newName} number ${newNumber} to phonebook saved!`)
    mongoose.connection.close()
  })
} else {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}