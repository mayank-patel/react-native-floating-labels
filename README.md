## react-native-floating-labels

A `<FloatingLabel>` component for react-native. This is still very much a work
in progress and only handles the simplest of cases, ideas and
contributions are very welcome.

![Demo](https://raw.githubusercontent.com/mayank-patel/react-native-floating-labels/master/demo.gif)

## Add it to your project


1. Run `npm install react-native-floating-labels --save`
2. `var FloatingLabel = require('react-native-floating-labels');`

## Usage

```javascript
'use strict';

var React = require('react-native');
var FloatingLabel = require('react-native-floating-labels');

var {
  AppRegistry,
  StyleSheet,
  View,
} = React;

class form extends React.Component{

  constructor(props, context) {
    super(props, context);

    this.state = {
      dirty: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <FloatingLabel>Email</FloatingLabel>
        <FloatingLabel>First Name</FloatingLabel>
        <FloatingLabel>Last Name</FloatingLabel>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#673AB7',
  },
});

AppRegistry.registerComponent('form', () => form);


```

**MIT Licensed**