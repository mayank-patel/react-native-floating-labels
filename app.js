'use strict';

import React from 'react'

import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native'

import FloatingLabel from './';

class form extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      dirty: false,
    };
  }

  onBlur() {
    console.log('#####: onBlur');
  }

  render() {
    return (
      <View style={styles.container}>
        <FloatingLabel
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            onBlur={this.onBlur}
            style={styles.formInput}
          >First Name</FloatingLabel>
        <FloatingLabel
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            onBlur={this.onBlur}
            style={styles.formInput}
          >Last Name</FloatingLabel>
        <FloatingLabel
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            style={styles.formInput}
            onBlur={this.onBlur}
          >Email</FloatingLabel>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 65,
    backgroundColor: 'white',
  },
  labelInput: {
    color: '#673AB7',
  },
  formInput: {
    borderBottomWidth: 1.5,
    marginLeft: 20,
    borderColor: '#333',
  },
  input: {
    borderWidth: 0
  }
});

AppRegistry.registerComponent('react-native-floating-labels', () => form);
const app = document.createElement('div')
document.body.appendChild(app)
AppRegistry.runApplication('react-native-floating-labels', {
  rootTag: app
})
