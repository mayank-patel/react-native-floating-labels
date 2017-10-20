## rn-floating-label-input [![Build Status](https://travis-ci.org/mayank-patel/react-native-floating-labels.svg?branch=master)](https://travis-ci.org/mayank-patel/react-native-floating-labels) [![npm version](https://badge.fury.io/js/react-native-floating-labels.svg)](https://badge.fury.io/js/react-native-floating-labels) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/hyperium/hyper/master/LICENSE) [![Code Climate](https://codeclimate.com/github/mayank-patel/react-native-floating-labels/badges/gpa.svg)](https://codeclimate.com/github/mayank-patel/react-native-floating-labels)
 
A `<FloatingLabelInput>` component for react-native. This is still very much a work
in progress and only handles the simplest of cases, ideas and
contributions are very welcome.

![Demo](https://raw.githubusercontent.com/mayank-patel/react-native-floating-labels/master/demo.gif)

## Add it to your project


1. Run `npm install rn-floating-label-input --save`
2. `import FloatingLabelInput from 'rn-floating-label-input';`

## Usage

```javascript
'use strict';

var React = require('react-native');

import FloatingLabelInput from 'rn-floating-label-input';

import { AppRegistry, StyleSheet, View, } from 'react-native';

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
        <FloatingLabelInput 
          labelStyle={styles.labelInput}
          inputStyle={styles.input}
          style={styles.formInput}
          value='john@email.com'
          onBlur={this.onBlur}
        >
          Email
        </FloatingLabelInput>
        <FloatingLabelInput 
          labelStyle={styles.labelInput}
          inputStyle={styles.input}
          style={styles.formInput}
        >
          First Name
        </FloatingLabelInput>
        <FloatingLabelInput
          labelStyle={styles.labelInput}
          inputStyle={styles.input}
          style={styles.formInput}
        >
          Last Name
        </FloatingLabelInput>
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

AppRegistry.registerComponent('form', () => form);
```

Additional Props: 

FloatingLabelInput is just like any TextInput. It supports the below mentioned events handlers:

```
Following properties of TextInput are supported:

- autoCapitalize
- autoCorrect
- autoFocus
- bufferDelay
- clearButtonMode
- clearTextOnFocus
- controlled
- editable
- enablesReturnKeyAutomatically
- keyboardType
- multiline
- password
- returnKeyType
- selectTextOnFocus
- selectionState
- style
- testID
- value

Following events are supported:

- onBlur
- onChange
- onChangeText
- onEndEditing
- onFocus
- onSubmitEditing

```

**MIT Licensed**
