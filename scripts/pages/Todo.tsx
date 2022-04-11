/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
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
}

const Comp = (props: Props) => {
  const [todoText, setTodoText] = useState('');

  const addData = () => {
    props.addTodo(todoText);
    setTodoText('');
    props.storeTodo();
  };

  const removeData = (index: number) => {
    props.removeTodo(index);
    props.storeTodo();
  };

  useEffect(() => {
    props.fetchTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item, index}: {item: string; index: number}) => (
    <View style={styles.row}>
      <Text style={{flex: 1}}>{item}</Text>
      <TouchableOpacity
        onPress={() => removeData(index)}
        style={[styles.button, styles.redBackground]}>
        <Text style={{color: 'white'}}>-</Text>
      </TouchableOpacity>
    </View>
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
        <TouchableOpacity onPress={addData} style={styles.button}>
          <Text style={{color: 'white'}}>+</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 24,
    width: 24,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'blue',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redBackground: {
    backgroundColor: 'red',
  },
  blueBackground: {
    backgroundColor: 'blue',
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
    padding: 12,
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
