import React, { useState, useEffect } from "react";
import {
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

export const AnimeForm = ({
  modalAnimeForm,
  setModalAnimeForm,
  dataArray,
  setdataArray,
  anime: objetoAnime,
  setAnime,
  deleteAnime,
}) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    console.log("Entre al useEffect");
    console.log("info del objeto user" + objetoAnime.id);
    if (Object.keys(objetoAnime).length > 0) {
      console.log("Entre al condicional del useEffect");
      setId(objetoAnime.id);
      setTitle(objetoAnime.title);
      setGenre(objetoAnime.genre);
      setRating(objetoAnime.rating);
    }
  }, [objetoAnime]);

  const handleAddAnime = () => {
    const fields = {
      "Nombre del ANIME": title,
      Género: genre,
      Rating: rating,
    };

    const emptyFields = Object.keys(fields).filter((key) => !fields[key]);

    if (emptyFields.length > 0) {
      Alert.alert(
        "Error",
        "Hay campos sin diligenciar: " + emptyFields.join(", ")
      );
      return;
    }

    const newAnime = {
      id: Date.now(),
      title,
      genre,
      rating,
    };

    if (id) {
      // Editar
      newAnime.id = id;
      console.log("Editando", newAnime);
      const animeEdited = dataArray.map((animeState) =>
        animeState.id === newAnime.id ? newAnime : animeState
      );
      console.log("Anime actualizados");
      setdataArray(animeEdited);
      setAnime({});
    } else {
      // Nuevo registro
      newAnime.id = Date.now();
      setdataArray([...dataArray, newAnime]);
    }

    setModalAnimeForm(!modalAnimeForm);

    setId("");
    setTitle("");
    setGenre("");
    setRating("");
  };

  const handleDeleteAnime = () => {
    if (id) {
      deleteAnime(id);
      setModalAnimeForm(!modalAnimeForm);
      setAnime({});
      setId("");
      setTitle("");
      setGenre("");
      setRating("");
    } else {
      Alert.alert("Error", "No se puede eliminar un registro que no existe.");
    }
  };

  return (
    <Modal animationType="slide" visible={modalAnimeForm}>
      <View style={styles.container}>
        <Text style={styles.title}>Nuevo Anime</Text>

        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Género"
          value={genre}
          onChangeText={setGenre}
        />

        <TextInput
          style={styles.input}
          placeholder="Rating"
          value={rating}
          onChangeText={setRating}
          keyboardType="numeric"
        />

        <Pressable
          style={styles.btnExit}
          onPress={() => {
            setModalAnimeForm(!modalAnimeForm);
            setAnime({});
            setId("");
            setTitle("");
            setGenre("");
            setRating("");
          }}
        >
          <Text style={styles.btnTextExit}>X cerrar</Text>
      </Pressable>

      <Pressable style={styles.btnAdd} onPress={handleAddAnime}>
        <Text style={styles.btnAddText}>Agregar</Text>
      </Pressable>

      <Pressable style={styles.btnDelete} onPress={handleDeleteAnime}>
        <Text style={styles.btnDeleteText}>Eliminar</Text>
      </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0069a3",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    width: "80%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  btnAdd: {
    backgroundColor: "#f4d73b",
    padding: 10,
    borderRadius: 5,
  },
  btnAddText: {
    fontSize: 18,
    color: "#000000",
  },
});
