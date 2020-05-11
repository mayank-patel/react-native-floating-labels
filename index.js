'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

import {
  StyleSheet,
  TextInput,
  LayoutAnimation,
  Animated,
  Easing,
  Text,
  View,
  Platform,
  ViewPropTypes
} from 'react-native';

var textPropTypes = Text.propTypes || ViewPropTypes
var textInputPropTypes = TextInput.propTypes || textPropTypes
var propTypes = {
  ...textInputPropTypes,
  inputStyle: textInputPropTypes.style,
  labelStyle: textPropTypes.style,
  disabled: PropTypes.bool,
  style: ViewPropTypes.style,
  inputRef: PropTypes.func,
}

var FloatingLabel  = createReactClass({
  propTypes: propTypes,

  getInitialState () {
    var state = {
      text: this.props.value,
      dirty: (this.props.value || this.props.placeholder)
    };

    var style = state.dirty ? dirtyStyle : cleanStyle
    state.labelStyle = {
      fontSize: new Animated.Value(style.fontSize),
      top: new Animated.Value(style.top)
    }

    return state
  },

  UNSAFE_componentWillReceiveProps (props) {
    if (typeof props.value !== 'undefined' && props.value !== this.state.text) {
      this.setState({ text: props.value, dirty: !!props.value })
      this._animate(!!props.value)
    }
  },

  _animate(dirty) {
    var nextStyle = dirty ? dirtyStyle : cleanStyle
    var labelStyle = this.state.labelStyle
    var anims = Object.keys(nextStyle).map(prop => {
      return Animated.timing(
        labelStyle[prop],
        {
          toValue: nextStyle[prop],
          duration: 200
        },
        Easing.ease
      )
    })

    Animated.parallel(anims).start()
  },

  _onFocus () {
    this._animate(true)
    this.setState({dirty: true})
    if (this.props.onFocus) {
      this.props.onFocus(arguments);
    }
  },

  _onBlur () {
    if (!this.state.text) {
      this._animate(false)
      this.setState({dirty: false});
    }

    if (this.props.onBlur) {
      this.props.onBlur(arguments);
    }
  },

  onChangeText(text) {
    this.setState({ text })
    if (this.props.onChangeText) {
      this.props.onChangeText(text)
    }
  },

  updateText(event) {
    var text = event.nativeEvent.text
    this.setState({ text })

    if (this.props.onEndEditing) {
      this.props.onEndEditing(event)
    }
  },

  _renderLabel () {
    return (
      <Animated.Text
        ref='label'
        style={[this.state.labelStyle, styles.label, this.props.labelStyle]}
      >
        {this.props.children}
      </Animated.Text>
    )
  },

  render() {
    var filteredProps = Object.assign({}, this.props, {style : {}, children: null, inputRef : null});
    var props = Object.assign({}, filteredProps,
        {
            onBlur: this._onBlur,
            onChangeText: this.onChangeText,
            onEndEditing: this.updateText,
            onFocus: this._onFocus,
            style: [styles.input],
            value: this.state.text,
            ref: this.props.inputRef || (_ => {})
        }),
        elementStyles = [styles.element];

    if (this.props.inputStyle) {
      props.style.push(this.props.inputStyle);
    }

    if (this.props.style) {
      elementStyles.push(this.props.style);
    }

    return (
  		<View style={elementStyles}>
        {this._renderLabel()}
        <TextInput
          {...props}
        >
        </TextInput>
      </View>
    );
  },
});

var labelStyleObj = {
  marginTop: 21,
  paddingLeft: 9,
  color: '#AAA',
  position: 'absolute'
}

if (Platform.OS === 'web') {
  labelStyleObj.pointerEvents = 'none'
}

var styles = StyleSheet.create({
  element: {
    position: 'relative'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderWidth: 1,
    color: 'black',
    fontSize: 20,
    borderRadius: 4,
    paddingLeft: 10,
    marginTop: 20,
  },
  label: labelStyleObj
})

var cleanStyle = {
  fontSize: 20,
  top: 7
}

var dirtyStyle = {
  fontSize: 12,
  top: -17,
}

module.exports = FloatingLabel;
