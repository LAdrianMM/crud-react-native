import React, { useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import firebase from '../database/firebase'

const UsersList = (props) => {
  const [state, setstate] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [ loading, setLoading ] = useState(false)

  const handleChangeText = (name, value) => {
    setstate({...state, [name]: value})
  }

  const saveNewUser = async () => {
    if(state.name === ''){
      alert('Please provide name')
    } else if(state.email === ''){
      alert('Please provide email')
    } else {
      try {
        setLoading(true)
        // Guardar los datos en firebase
        await firebase.db.collection('users').add({
          name: state.name,
          email: state.email,
          phone: state.phone
        })
        // Redirecciona a la pantala UserList
        props.navigation.navigate('UsersList')       
        setLoading(false)
      } catch (error) {
       console.log(error) 
      }
    }
  }

  if(loading){
    return(
      <View>
        <ActivityIndicator size='large' color='#9e9e9e' />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGrup}>
        <TextInput 
          placeholder='Name User' 
          onChangeText={(value) => handleChangeText('name', value)} />
      </View>
      <View style={styles.inputGrup}>
        <TextInput 
          placeholder='Email'
          onChangeText={(value) => handleChangeText('email', value)} />
      </View>
      <View style={styles.inputGrup}>
        <TextInput 
          placeholder='Phone'
          onChangeText={(value) => handleChangeText('phone', value)} />
      </View>
      <View style={styles.buttonSave}>
        <Button 
        title='Save User' 
        onPress={() => saveNewUser()}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGrup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  buttonSave: {
    marginTop: 10,
  }
})

export default UsersList
