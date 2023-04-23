import React from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";

export default function UserInformation({ user, visible, setVisible }) {
  const dateFormate = (date) => {
    const newDate = new Date(date);
    const optionsFormate = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString("es-ES", optionsFormate);
  };

  if (!user) {
    return null;
  }

  const { userName, userEmail, cellphone, comments, date } = user;

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>INFORMACIÓN</Text>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.info}>Correo: {userEmail}</Text>
            <Text style={styles.info}>Celular: {cellphone}</Text>
            <Text style={styles.info}>Comentarios: {comments}</Text>
            <Text style={styles.info}>Fecha: {dateFormate(date)}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 15,
    color: "#0069a3",
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  date: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#0069a3",
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
