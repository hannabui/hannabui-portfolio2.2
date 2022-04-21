//I chose option 1.1 where I work on two previous projects
//I've added additional componenets such as:
//Changing the colors of the to-do list
//Adding a delete button to delete the to-do list items
//Added a favorite button to the to-do list items to mark as important
import { useCallback, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { CheckBox, Input, Button } from "react-native-elements";

export default function App() {
  let [inputText, setInputText] = useState("")
  let [bg, setBg] = useState("")
  let [tasks, setTasks] = useState([
    { description: "Task 1", key: "1", completed: true, fav:false },
    { description: "Task 2", key: "2", completed: false, fav:false },
    { description: "Task 3", key: "3", completed: false, fav:false },
  ])
  let addTask = useCallback(() => {
    let keys = tasks.map((task) => parseInt(task.key))
    let maxKey = Math.max(...keys) + 1;
    let newTask = {
      description: inputText,
      completed: false,
      key: maxKey.toString(),
    };
    setTasks([...tasks, newTask]);
    setInputText("");
  }, [inputText]);

  let changeBackground = ((color) => {
    setBg(color)
  })

  let deleteItem = ((key) => {
   setTasks( tasks.filter(task => task.key != key))
  })

  let addFav = ((taskS) => {
    let selectedTask= tasks.find(task => task.key ==taskS.key)
    selectedTask.fav= !selectedTask.fav

   setTasks([...tasks ])
  })

  return (
    <View style={[styles.container, {backgroundColor: bg }]}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>TODO APP</Text>
          <Input
            value={inputText}
            onChangeText={setInputText}
            style={{ height: 30, paddingBottom: 20 }}
          ></Input>
          <Button title="Add" onPress={addTask}></Button>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.key}
          renderItem={({ item: task }) =>
            <View style={[styles.listItem, {
             backgroundColor: task.fav ? 'lightpink':''
            } ] } >
              <CheckBox
              onPress={() => {
                let curTask = tasks.find(t => t.key == task.key);
                curTask.completed = !curTask.completed
                setTasks([...tasks]);
              }} title={task.description}
              checked={task.completed}
              textStyle={ task.completed ? {
                    textDecorationLine: 'line-through',
                    textDeorationStyle: 'solid',
                  } : undefined}
            ></CheckBox>
              <Button onPress={()=> addFav(task)} title="Fave"></Button>
              <Button onPress={()=> deleteItem(task.key)} title="Delete"></Button>
            </View>
          } />
      </View>

      <View style={styles.colorsWrapper}>
      <TouchableOpacity style={[styles.colorBox, styles.bgRed]} onPress={() => changeBackground("red")} ></TouchableOpacity>
      <TouchableOpacity style={[styles.colorBox, styles.bgOrange]} onPress={() => changeBackground("orange")} ></TouchableOpacity>
      <TouchableOpacity style={[styles.colorBox, styles.bgPurple]} onPress={() => changeBackground("purple")} ></TouchableOpacity>
      <TouchableOpacity style={[styles.colorBox, styles.bgBlue]} onPress={() => changeBackground("blue")} ></TouchableOpacity>
      <TouchableOpacity style={[styles.colorBox, styles.bgYellow]} onPress={() => changeBackground("yellow")} ></TouchableOpacity>
      <TouchableOpacity style={[styles.colorBox, styles.bgGreen]} onPress={() => changeBackground("green")} ></TouchableOpacity>
      <TouchableOpacity style={[styles.colorBox, styles.bgWhite]} onPress={() => changeBackground("white")} ></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    flexDirection: "row",
    lineHeight: 4,
    paddingBottom: 50,
    marginBottom: 50,
  },
  title: {
    fontSize: 25,
    alignSelf: "center",
  },
  listItem:{
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  innerContainer: {
    maxWidth: 300,
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
  },
  container: {
    flex: 1,
    flexDirection:'row',
    backgrounColor: "#fff",
    alignitems: "center",
    justifyContent: "space-evenly",
  },
  colorsWrapper:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "end"
  },
  colorBox:{
    height: 20,
    width: 30,
    marginRight:5
  },
  bgRed:{
    backgroundColor: "red"
  },
  bgOrange: {
    backgroundColor: "orange"
  },
  bgGreen: {
    backgroundColor: "green"
  },
  bgPurple: {
    backgroundColor: "purple"
  },
  bgYellow: {
    backgroundColor: "yellow"
  },
  bgBlue: {
    backgroundColor: "blue"
  },
  bgWhite: {
    backgroundColor: "white"
  }
});