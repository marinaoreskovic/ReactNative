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
  const [TextInput, setTextInput] = useState("");
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
  };
  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMoodalVisible(false)}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0 0.5",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{ backgroundColor: "white", width: "50%", height: "25%" }}
          >
            <Text>Estas seguro que deseas borrar {itemSelected.value}?</Text>
            <View>
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
      {list.lenght > 0 ? (
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
          keyExtractor={(item = item.id)}
        />
      ) : (
        <Text>No hay tareas</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
