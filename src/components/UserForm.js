import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";


export const UserForm = ({
  modalUserForm,
  setModalUserForm,
  registeredUsers,
  setRegisteredUsers,
  user: userObj
}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [comments, setComments] = useState("");

  console.log(Object.keys(userObj));

  useEffect(() => {
    console.log("Entre al useEffect");
    console.log("info del objeto user" + userObj.id);
    if (Object.keys(userObj).length > 0) {
      console.log("Entre al condicional del useEffect");
      setId(userObj.id);
      setUserName(userObj.userName);
      setUserEmail(userObj.userEmail);
      setCellphone(userObj.cellphone);
      setComments(userObj.comments);
      setDate(userObj.fecha);
    }
  }, [userObj]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleUser = () => {
    console.log("Handling user...");
  
    const fields = {
      "Nombre Completo": userName,
      "Correo": userEmail,
      "Celular": cellphone,
      "Comentarios": comments,
    };
  
    const emptyFields = Object.entries(fields)
      .filter(([, value]) => value === "")
      .map(([key]) => key);
  
    if (emptyFields.length > 0) {
      console.log("Error: Hay campos sin diligenciar:", emptyFields.join(", "));
      return;
    }

    
    if (![userName, userEmail, cellphone, comments].every(field => field !== "")) {
      console.log("Error: Hay campos sin diligenciar");
      setTimeout(() => {
        Alert.alert("Error", "Hay campos sin diligenciar");
      }, 100);
      return;
    }
  
    const newUser = {
      userName,
      userEmail,
      cellphone,
      date,
      comments,
    };

    if (id) {
      // Editar
      newUser.id = id;
      console.log("Editando", newUser);
      const userEdited = registeredUsers.map()
    } else {
      // Nuevo registro
      newUser.id = Date.now();
      setRegisteredUsers([...registeredUsers, newUser]);
    }

    setRegisteredUsers([...registeredUsers, newUser]);
    setModalUserForm(!modalUserForm);
  
    setUserName("");
    setUserEmail("");
    setCellphone("");
    setDate(new Date());
    setComments("");
  };
  
  
  

  return (
    <Modal animationType="slide" visible={modalUserForm}>
      <ImageBackground
        source={require("../assets/jpg/dev2.jpg")}
        resizeMode="cover"
        style={styles.backCover}
      >
        <Image
          style={styles.image}
          //source={require("../assets/png/logo_UAM-08.png")}
        />

        <ScrollView>
          <Text style={styles.title}>
            Inscripción {""}
            <Text style={styles.titleBold}>Vacaciones UAM</Text>
          </Text>

          <Pressable
            style={styles.btnExit}
            onPress={() => setModalUserForm(false)}
          >
            <Text style={styles.btnTextExit}>X cerrar</Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.text}>Nuevo usuario</Text>
            <TextInput
              placeholder="Nombre Completo"
              placeholderTextColor={"#F8F9F9"}
              style={styles.input}
              value={userName}
              onChangeText={setUserName}
            ></TextInput>
          </View>

          <View style={styles.campo}>
            <Text style={styles.text}>Correo</Text>
            <TextInput
              placeholder="@autonoma.edu.co"
              placeholderTextColor={"#F8F9F9"}
              style={styles.input}
              keyboardType="email-address"
              value={userEmail}
              onChangeText={setUserEmail}
            ></TextInput>
          </View>

          <View style={styles.campo}>
            <Text style={styles.text}>Celular</Text>
            <TextInput
              placeholder="Celular"
              placeholderTextColor={"#F8F9F9"}
              style={styles.input}
              keyboardType="phone-pad"
              value={cellphone}
              onChangeText={setCellphone}
              maxLength={10}
            ></TextInput>
          </View>

          <View style={styles.campo}>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          </View>
          
          <View styles={styles.campo}>
            <TextInput
              placeholder="Dejanos tus comentarios"
              placeholderTextColor={"#F8F9F9"}
              style={[styles.input, styles.inputCommnets]}
              numberOfLines={6}
              multiline={true}
              value={comments}
              onChangeText={setComments}
            ></TextInput>
          </View>

          <Pressable style={styles.btnNewUser} onPress={handleUser}>
            <Text style={styles.btnTextNewUser}>Agregar</Text>
          </Pressable>
        </ScrollView>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    margin: 15,
    width: 75,
    height: 75,
    marginBottom: 15,
  },
  backCover: {
    position: "absolute",
    marginTop: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.7,
    backgroundColor: "rgba(52,52,52,alpha)",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    color: "#FFFFFF",
    marginHorizontal: 30,
    fontWeight: "600",
    marginBottom: 20,
  },
  titleBold: {
    textAlign: "center",
    fontSize: 22,
    color: "#0069a3",
    marginHorizontal: 30,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#000000c0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    color: "#FFF",
    marginBottom: 8,
    marginTop: 12,
  },
  campo: {
    marginHorizontal: 30,
  },
  inputCommnets: {
    height: 100,
  },
  inputDate: {
    textAlign: "center",
  },
  btnExit: {
    marginVertical: 30,
    backgroundColor: "#000000c0",
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  btnTextExit: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  btnNewUser: {
    marginVertical: 50,
    backgroundColor: "#0069a3",
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnTextNewUser: {
    textAlign: "center",
    color: "#FFF",
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 16,
  },
});