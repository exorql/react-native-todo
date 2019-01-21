/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import TodoInput from './src/component/TodoInput';
import TodoItem from './src/component/TodoItem';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  delete = (index) => () => {
    const list = [].concat(this.state.list);
    list.splice(index, 1);

    this.setState({
      list,
    });
  }

  done = (index) => () => {
    const list = [].concat(this.state.list);
    list[index].done = !list[index].done;

    this.setState({
      list,
    });
  }
  
  onPress = (text) => {
    const list = [].concat(this.state.list);

    list.push({
      key: Date.now(),
      text: text,
      done: false,
    });

    this.setState({
      list,
    });
  }

  render() {
      const {
        list,
      } = this.state;

      return (
        <View style={StyleSheet.container}>
          <View style={StyleSheet.main}>
            <TodoInput onPress={this.onPress}/>
            <View style={StyleSheet.todoListContainer}>
              <FlatList
                style={styles.todoList}
                data={list}
                renderItem={({ item, index }) => (
                  <TodoItem
                    onDone={this.done(index)}
                    onDelete={this.delete(index)}
                    {...item}
                  />
                )}
              />
            </View>
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  main: {
    flex: 1,
    maxWidth: 400,
    alignItems: 'center',
  },
  todoListContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  todoList: {
    paddingLeft: 10,
    paddingRight: 10,
  }
});