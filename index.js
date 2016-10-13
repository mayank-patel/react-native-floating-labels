'use strict';
import React, { PropTypes } from 'react';
import {
  StyleSheet,
  TextInput,
  LayoutAnimation,
  Animated,
  Easing,
  Text,
  Platform,
  View,
} from 'react-native';

var textPropTypes = Text.propTypes || View.propTypes
var textInputPropTypes = TextInput.propTypes || textPropTypes
var propTypes = {
  ...textInputPropTypes,
  inputStyle: textInputPropTypes.style,
  labelStyle: textPropTypes.style,
  disabled: PropTypes.bool,
  style: View.propTypes.style,
}

var FloatingLabel  = React.createClass({
  propTypes: propTypes,

  getInitialState () {
    var state = {
      text: this.props.value,
      dirty: !!this.props.value
    };

    var style = state.dirty ? dirtyStyle : cleanStyle
    state.labelStyle = {
      fontSize: new Animated.Value(style.fontSize),
      top: new Animated.Value(style.top)
    }

    return state
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
    var props = {
        autoCapitalize: this.props.autoCapitalize,
        autoCorrect: this.props.autoCorrect,
        autoFocus: this.props.autoFocus,
        bufferDelay: this.props.bufferDelay,
        clearButtonMode: this.props.clearButtonMode,
        clearTextOnFocus: this.props.clearTextOnFocus,
        controlled: this.props.controlled,
        editable: this.props.editable,
        enablesReturnKeyAutomatically: this.props.enablesReturnKeyAutomatically,
        keyboardType: this.props.keyboardType,
        multiline: this.props.multiline,
        onBlur: this._onBlur,
        onChange: this.props.onChange,
        onChangeText: this.onChangeText,
        onEndEditing: this.updateText,
        onFocus: this._onFocus,
        onSubmitEditing: this.props.onSubmitEditing,
        password: this.props.password,
        returnKeyType: this.props.returnKeyType,
        selectTextOnFocus: this.props.selectTextOnFocus,
        selectionState: this.props.selectionState,
        style: [styles.input],
        testID: this.props.testID,
        value: this.props.value,
      },
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

var styles = StyleSheet.create({
  element: {
    position: 'relative'
  },
  input: {
    height: 45,
    borderColor: 'gray',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderWidth: 1,
    color: 'black',
    fontSize: 18,
    borderRadius: 4,
    marginLeft: Platform.OS === 'android' ? -5 : 0,
    // paddingLeft: 10,
    marginTop: 20,
  },
  label: {
    marginTop: 21,
    pointerEvents: 'none',
    // paddingLeft: 9,
    color: '#AAA',
    position: 'absolute'
  }
})

var cleanStyle = {
  fontSize: 18,
  top: 7
}

var dirtyStyle = {
  fontSize: 12,
  top: -17,
}

FloatingLabel.propTypes = {
  disabled: PropTypes.bool,
  style: Text.propTypes.style,
};

module.exports = FloatingLabel;
