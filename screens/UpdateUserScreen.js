import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import firebase from '../database/firebase'

const UpdateUserScreen = (props) => {
  const initialState = {
    id: '',
    name: '',
    email: '',
    phone: ''
  }
  const [ user, setUser ] = useState(initialState)
  const [ loading, setLoading ] = useState(true)

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection('users').doc(id)
    const doc = await dbRef.get()
    const user = doc.data()
    setUser({...user, id: doc.id})
    setLoading(false)
  }

  useEffect(() => {
    getUserById(props.route.params.userId)
  },[])

  const handleChangeText = (name, value) => {
    setUser({...user, [name]: value})
  }

  const updateUser = async () => {
    setLoading(true)
    const dbRef = firebase.db.collection('users').doc(user.id)
    await dbRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone
    })
    setUser(initialState)
    setLoading(false)
    props.navigation.navigate('UsersList')
  }

  const deleteUser = async () => {
    setLoading(true)
    const dbRef = firebase.db.collection('users').doc(user.id)
    await dbRef.delete()
    setLoading(false)
    props.navigation.navigate('UsersList')
  }

  const openConfirmationAlert = () => {
    Alert.alert('Remove the User', 'Are you sure to delete the user?', [
      {text: 'Yes', onPress: () => deleteUser() },
      {text: 'No', onPress: () => console.log('User al ready exist') }
    ])
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
        value={user.name} 
        onChangeText={(value) => handleChangeText('name', value)} />
    </View>
    <View style={styles.inputGrup}>
      <TextInput 
        placeholder='Email'
        value={user.email}
        onChangeText={(value) => handleChangeText('email', value)} />
    </View>
    <View style={styles.inputGrup}>
      <TextInput 
        placeholder='Phone'
        value={user.phone}
        onChangeText={(value) => handleChangeText('phone', value)} />
    </View>
    <View style={styles.buttonContainer}>
      <Button title='Update User' onPress={() => updateUser()}/>
    </View>
    <View style={styles.buttonContainer}>
      <Button 
        color='#E37399' 
        title='Delete User' 
        onPress={() => openConfirmationAlert()}/>
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
  buttonContainer: {
    marginTop: 20,
  },
})

export default UpdateUserScreen