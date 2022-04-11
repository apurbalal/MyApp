/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';

interface Props {
  todo: Array<string>;
  loading?: boolean;
  addTodo: (data: string) => void;
  storeTodo: () => any;
  removeTodo: (index: number) => void;
  fetchTodo: () => any;
  autoSaving: boolean;
  updateTodo: (data: string, index: number) => void;
}

const Comp = (props: Props) => {
  const [todoText, setTodoText] = useState('');
  const [buttonText, setButtonText] = useState('Add');
  const [editIndex, setEditIndex] = useState<number>(-1);

  const removeData = (index: number) => {
    props.removeTodo(index);
    props.storeTodo();
  };

  useEffect(() => {
    props.fetchTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setButtonStateAdd = () => {
    setEditIndex(-1);
    setButtonText('Add');
    setTodoText('');
  };

  const setButtonStateUpdate = (index: number, text: string) => {
    setEditIndex(index);
    setButtonText('Update');
    setTodoText(text);
  };

  // Toggle button between edit and update mode
  const toggleEdit = (index: number, text: string) =>
    buttonText === 'Update' && index === editIndex
      ? setButtonStateAdd()
      : setButtonStateUpdate(index, text);

  const handleButtonPress = () => {
    if (buttonText === 'Update') {
      props.updateTodo(todoText, editIndex);
    } else {
      props.addTodo(todoText);
    }
    setButtonStateAdd();
    props.storeTodo();
  };

  const renderItem = ({item, index}: {item: string; index: number}) => (
    <TouchableOpacity
      style={[
        styles.row,
        {backgroundColor: editIndex === index ? 'lightgray' : 'white'},
      ]}
      onPress={() => toggleEdit(index, item)}>
      <Text style={{flex: 1}}>{item}</Text>
      <TouchableOpacity
        onPress={() => removeData(index)}
        style={styles.removeButton}>
        <Text style={{color: 'white'}}>-</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props?.todo}
        renderItem={renderItem}
        refreshing={props?.loading}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <TextInput
          placeholder="Enter todo item..."
          value={todoText}
          onChangeText={setTodoText}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
          <Text style={{color: 'white'}}>{buttonText}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  removeButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'red',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    overflow: 'hidden',
    backgroundColor: 'blue',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    padding: 18,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  input: {
    flex: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  row: {
    padding: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
});

export default Comp;
