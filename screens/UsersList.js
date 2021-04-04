import React, { useEffect, useState } from 'react'
import { Button, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import firebase from '../database/firebase'
import { ListItem, Avatar } from 'react-native-elements'

const UserList = (props) => {
  const [ users, setUsers ] = useState([])

  useEffect(() => {
    // Traer los datos desde firebase
    firebase.db.collection('users').onSnapshot(querySnapshot => {
      const users = []
      querySnapshot.docs.forEach(doc => {
        const { name, email, phone } = doc.data()
        // Guardar los datos en un arreglo
        users.push({
          id: doc.id,
          name,
          email,
          phone
        })
      })
      setUsers(users)
    })
  }, [])



  return (
    <ScrollView>
      {
        users.map(user => {
          return(
            <ListItem
              key={user.id}
              // a traves de las props se envia la propiedad userID
              onPress={() => props.navigation.navigate('UpdateUserScreen', {
                userId: user.id
              })}
              bottomDivider
            >
              <ListItem.Chevron />
              <Avatar 
                  rounded
                  source={{
                    uri:
                    'https://img2.freepng.es/20180703/ya/kisspng-computer-icons-user-avatar-user-5b3bafe2381423.1933594815306383062297.jpg',
                  }}
                />
              <ListItem.Content>
                <ListItem.Title>{user.name}</ListItem.Title>
                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )
        })
      }
       <Button
        title='Create User' 
        onPress={() => props.navigation.navigate('CreateUserScreen')} 
      />
    </ScrollView>
  )
}

export default UserList