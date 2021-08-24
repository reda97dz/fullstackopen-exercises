const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('enter password')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://reda_baka:${password}@cluster0.pk0ti.mongodb.net/phonebook-app?retryWrites=true&w=majority`
mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){
    console.log('Phonebook')
    Person.find({}).then(persons => {
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}else{
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({
        name: name,
        number: number
    })
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number}`)
        mongoose.connection.close()
    })
}