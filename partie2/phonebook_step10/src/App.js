import React, { useState, useEffect } from 'react'
import Input from './Input'
import personService from './service/persons'
import axios from 'axios';
import Person from './Person';
import Notification from './Notification';
import ErrorNotification from './ErrorNotification';

const App = (props) => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState('')
  const [successMessage, setSuccesMessage] = useState('Display message succes')
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  const effet = () => {
    console.log('effect');
    personService
      .getAll()
      .then(initialpersons => {
        setPersons(initialpersons);
      })
  }
  useEffect(effet, [])

  let personToShow = persons;
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }


  const toggleImportanceOf = (id) => {
    const person = persons.find(num => num.id === id)
    const changedNumber = { ...person, newNumber: persons.number }
    personService
      .update(id, changedNumber)
      .then(returneNumber => {
        setPersons(persons.map(number =>
          number.id !== id ? number : returneNumber))
      })
      .catch(error => {
        setErrorMessage(
          `the name '${persons.name}
    ' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setPersons(persons.filter(n => n.id !== id))
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObjet = {
      name: newName,
      number: newNumber,
    }

    const incudePerson = persons.map(value => value.name)

    if (incudePerson.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      toggleImportanceOf(persons.id)
      setNewName('');
      setNewNumber('');
    }
    else {
      personService
        .create(personObjet)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setSuccesMessage(
            `Added'${newName} successe`
          )
          setNewName('');
          setNewNumber('')
          setTimeout(() => {
            setSuccesMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.message)
          setTimeout(() => {
            setErrorMessage(null)
            console.log(error.response.data)
          }, 5000)
        })
    }
  }

  const handlerfilter = (event) => {
    setShowAll(event.target.value)
  }
  if (showAll) {
    const showFiltre = persons.filter(value => value.name.includes(showAll));
    personToShow = showFiltre;
  }
  const id = persons.find(num => num.id === id)
  console.log('id', id)
  const handlerClickDelete = (id) => {
    if (window.confirm('delete  {nom.name} ?')) {

      personService
        .Delete(id)
        .then(response => {
          setPersons(persons.filter(val => val.id !== id));
          console.log('respose data', response.data)
        })
        .catch(error => {
          setErrorMessage(error.message)
          setTimeout(() => {
            setErrorMessage(null)
            console.log('erro', error)
          }, 5000)
        })
    }

  }
  return (
    <div>

      <div>
        filter shown with <Input
          newvalue={showAll}
          handleronchange={handlerfilter}
        />
      </div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <form onSubmit={addPerson}>
        <div>
          name: <Input
            newvalue={newName}
            handleronchange={handlePersonChange}
          />
        </div>
        <div>
          Number: <Input
            newvalue={newNumber}
            handleronchange={handleNumber}
          />
        </div>
        <button type='submit'>

          {personToShow.map((nom, i) => {
            <Person
              key={i}
              toggleName={() => toggleImportanceOf(nom.id)}
              label='add'
            />
          })
          }

        </button>
      </form>
      <h2>Numbers</h2>

      <div>
        {personToShow.map((nom, i) =>
          <p key={i}>{nom.name}  {nom.number}
            <button onClick={ }
            >delete</button>
          </p>)}
      </div>
      <ErrorNotification message={errorMessage} />
    </div>
  )

}
export default App