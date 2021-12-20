import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Modal,
} from "react-native";

export default function App() {
  const [list, setList] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [modalVisible, setMoodalVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const onAdd = () => {
    setList([
      ...list,
      { id: Math.floor(Math.random() * 100) + 1, value: textInput },
    ]);
  };
  const onHandlerModal = (item) => {
    setItemSelected(item);
    setMoodalVisible(true);
  };
  const onDelete = (id) => {
    setList(list.filter((item) => item.id != id));
    setMoodalVisible(false);
  };
  console.log(list, "soy list");
  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMoodalVisible(false)}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0 0.5)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{ backgroundColor: "white", width: "50%", height: "25%" }}
          >
            <Text>Estas seguro que deseas borrar {itemSelected.value}?</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Button title="Si" onPress={() => onDelete(itemSelected.id)} />
              <Button title="No" onPress={() => setMoodalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.containerInput}>
        <TextInput
          placeholder="Escribe aqui"
          onChangeText={(text) => setTextInput(text)}
          style={styles.input}
        />

        <Button title="Add" onPress={() => onAdd()} />
      </View>
      {list.length > 0 ? (
        <FlatList
          data={list}
          renderItem={(data) => (
            <View style={styles.containerItem}>
              <Text
                style={{ fontWeight: "bold", fontSize: 20, color: "black" }}
              >
                {data.item.value}
              </Text>
              <Button onPress={() => onHandlerModal(data.item)} title="X" />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text> No hay tareas </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  containerInput: {
    flexDirection: "row",
    width: "100%",
    height: "10%",
    marginTop: "3%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidht: 5,
    width: "70%",
  },
  containerItem: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: "3%",
  },
});
