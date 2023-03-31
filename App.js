import React,{useState} from 'react';
import  {UserForm}  from './src/components/UserForm';
import { FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { User } from './src/components/User';
import { AnimeForm } from './src/components/AnimeForm';
import { Anime } from './src/components/Anime';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalUserForm,setModalUserForm] = useState(false)
  const [modalAnimeForm,setModalAnimeForm] = useState(false)
  const [registeredUsers,setRegisteredUsers] = useState([])
  const [user, setUser] = useState({})


  const [dataArray,setdataArray] = useState([])
  const [anime, setAnime] = useState({})


  const editUser = (id) => {
    console.log("usuario",id);
    const editUser = registeredUsers.filter((user)=> user.id === id);
    setUser(editUser[0])
    console.log(editUser);
  }

  const editanime = (id) => {
    console.log("anime",id)
    const editedanime = dataArray.filter((anime) => anime.id=== id )
    setAnime(editedanime[0])
    console.log(editedanime);
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Registrate en la {""}
        <Text style={styles.titleBold}>UAM</Text>
      </Text>

      <Pressable onPress={() => {setModalVisible(true)}} style = {styles.btnNewUser}>
        <Text style = {styles.title}>Prueba Modal</Text>
      </Pressable>

      <Pressable onPress={() => {setModalUserForm(true)}} style = {styles.btnNewUser}>
        <Text style = {styles.title}>Nuevo Usuario</Text>
      </Pressable>
      {
        registeredUsers.length === 0 ? (
          <Text style = {styles.textNoUser}>No hay usuarios Registrados</Text>
        ) : (
          <FlatList
            data = {registeredUsers}
            keyExtractor = {(item) => item.id}
            renderItem={ ({item}) => {
              console.log(item);
              return <User item = {item} 
              setModalUserForm = {setModalUserForm}
              editUser = {editUser}
              user = {user}
              />
            }}
          />
        )
      }
      <UserForm 
        modalUserForm={modalUserForm} 
        setModalUserForm={setModalUserForm}
        registeredUsers = {registeredUsers}
        setRegisteredUsers = {setRegisteredUsers}
        user = {user}
      ></UserForm>

      <Pressable onPress={() => {setModalAnimeForm(true)}} style = {styles.btnNewUser}>
        <Text style = {styles.title}>Nuevo ánime</Text>
      </Pressable>
      {
        dataArray.length === 0 ? (
          <Text style = {styles.textNoUser}>No hay Animes Registrados</Text>
        ) : (
          <FlatList
            style = {styles.userList}
            data = {dataArray}
            keyExtractor = {(item) => item.id}
            renderItem={ ({item}) => {
              console.log(item);
              return <anime item = {item} 
              setModalAnimeForm={setModalAnimeForm}
              editAnime={editanime}
              />
            }}
          />
        )
      }
      <AnimeForm 
        modalAnimeForm={modalAnimeForm}
        setModalAnimeForm={setModalAnimeForm}
        dataArray={dataArray}
        setdataArray={setdataArray}
        anime={anime}
      />
      

      <Modal animationType='slide' visible={modalVisible}>
        <Text>Desde Modal</Text>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor : "#0069a3",
    flex : 1
  },
  title : {
    textAlign : "center",
    fontSize : 22,
    color : "#FFFFFF"
  },
  titleBold : {
    fontWeight : "900",
    color : "#f4d73b"
  },
  btnNewUser : {
    backgroundColor : "#f4d73b",
    padding : 10,
    marginTop : 30,
    marginHorizontal : 20,
    borderRadius : 10
  },
  titleButton:{
    textAlign : "center",
    fontSize: 20,
    color : "#000000"
  },
  userList : {
    marginTop : 50,
    marginHorizontal : 30
  }
});
