'use strict';
import React, { Component } from 'react';
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
  ViewPropTypes,
  Platform
} from 'react-native';

var textPropTypes = Text.propTypes || ViewPropTypes;
var textInputPropTypes = TextInput.propTypes || textPropTypes;
var propTypes = {
  ...textInputPropTypes,
  inputStyle: textInputPropTypes.style,
  labelStyle: textPropTypes.style,
  disabled: PropTypes.bool,
  isSelectField: PropTypes.bool,
  style: ViewPropTypes.style
};

const cleanStyle = {
  fontSize: 20,
  top: 7
};

const dirtyStyle = {
  fontSize: 12,
  top: -17
};

var FloatingLabel = createReactClass({
  propTypes: propTypes,

  getInitialState() {
    var state = {
      text: this.props.value,
      dirty: Boolean(this.props.value || this.props.placeholder),
      focused: Boolean(this.props.autoFocus),
      height: 0
    };

    this.cleanStyle = this.props.cleanStyle ? this.props.cleanStyle : cleanStyle;
    this.dirtyStyle = this.props.dirtyStyle ? this.props.dirtyStyle : dirtyStyle;

    var style = state.dirty ? this.dirtyStyle : this.cleanStyle;
    state.labelStyle = {
      fontSize: new Animated.Value(style.fontSize),
      top: new Animated.Value(style.top)
    };

    return state;
  },

  componentWillReceiveProps(props) {
    // if (typeof props.value !== 'undefined' && props.value !== this.state.text) {
    //   const shouldAnimate = !Boolean(this.state.text);
    //   this.setState({ text: props.value, dirty: !!Boolean(props.value) });
    //   if (props.isSelectField) {
    //     this._animate(!!props.value);
    //   } else if (shouldAnimate) {
    //     this._animate(true);
    //   } else if (!this.state.focused && !this.state.text) {
    //     this._animate(false);
    //   }
    // } else if (
    //   props.value === undefined &&
    //   (props.keyboardType !== 'numeric' || props.keyboardType !== 'decimal-pad')
    // ) {
    //   this.setState({ text: props.value, dirty: false, focused: false });
    //   this._animate(false);
    // }
    if (props.value !== undefined && props.value !== this.state.text) {
      const shouldAnimate = Boolean(props.value);
      this.setState({ text: props.value, dirty: !!Boolean(props.value) });
      if (props.isSelectField) {
        this._animate(!!props.value);
      } else {
        this._animate(shouldAnimate || this.state.focused);
      }
    } else if (props.value === undefined && this.state.text !== '') {
      this.setState({ text: props.value, dirty: false });
      this._animate(false);
    }
  },

  _animate(dirty) {
    var nextStyle = dirty ? this.dirtyStyle : this.cleanStyle;
    var labelStyle = this.state.labelStyle;
    var anims = Object.keys(nextStyle).map(prop => {
      return Animated.timing(
        labelStyle[prop],
        {
          toValue: nextStyle[prop],
          duration: 200
        },
        Easing.ease
      );
    });

    Animated.parallel(anims).start();
  },

  _onFocus() {
    this._animate(true);
    this.setState({ dirty: true, focused: true });
    if (this.props.onFocus) {
      this.props.onFocus(arguments);
    }
  },

  _onBlur() {
    if (!this.state.text) {
      this._animate(false);
      this.setState({ dirty: false });
    }

    this.setState({ focused: false });

    if (this.props.onBlur) {
      this.props.onBlur(arguments);
    }
  },

  onChangeText(text) {
    this.setState({ text });
    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
  },

  updateText(event) {
    var text = event.nativeEvent.text;
    this.setState({ text });

    if (this.props.onEndEditing) {
      this.props.onEndEditing(event);
    }
  },

  _renderLabel() {
    return (
      <Animated.Text ref="label" style={[this.state.labelStyle, styles.label, this.props.labelStyle]}>
        {this.props.children}
      </Animated.Text>
    );
  },

  render() {
    var props = {
        autoCapitalize: this.props.autoCapitalize,
        autoCorrect: this.props.autoCorrect,
        autoFocus: this.props.autoFocus,
        blurOnSubmit: this.props.blurOnSubmit,
        bufferDelay: this.props.bufferDelay,
        clearButtonMode: this.props.clearButtonMode,
        clearTextOnFocus: this.props.clearTextOnFocus,
        controlled: this.props.controlled,
        editable: this.props.editable,
        enablesReturnKeyAutomatically: this.props.enablesReturnKeyAutomatically,
        keyboardType: this.props.keyboardType,
        multiline: this.props.multiline,
        numberOfLines: this.props.numberOfLines,
        onBlur: this._onBlur,
        onChange: this.props.onChange,
        onChangeText: this.onChangeText,
        onEndEditing: this.updateText,
        onFocus: this._onFocus,
        onSubmitEditing: this.props.onSubmitEditing,
        password: this.props.secureTextEntry || this.props.password, // Compatibility
        placeholder: this.props.placeholder,
        secureTextEntry: this.props.secureTextEntry || this.props.password, // Compatibility
        returnKeyType: this.props.returnKeyType,
        selectTextOnFocus: this.props.selectTextOnFocus,
        selectionState: this.props.selectionState,
        style: [styles.input],
        testID: this.props.testID,
        value: this.state.text,
        underlineColorAndroid: this.props.underlineColorAndroid, // android TextInput will show the default bottom border
        onKeyPress: this.props.onKeyPress
      },
      elementStyles = [styles.element];

    if (this.props.inputStyle) {
      props.style.push(this.props.inputStyle);
    }

    if (this.props.style) {
      elementStyles.push(this.props.style);
    }

    props.style.push({ height: Math.max(35, this.state.height) });

    return (
      <View style={elementStyles}>
        {this._renderLabel()}
        {this.props.inputRef ? (
          this.props.editable ? (
            <TextInput
              {...props}
              onContentSizeChange={event => {
                this.setState({ height: event.nativeEvent.contentSize.height });
              }}
              ref={input => this.props.inputRef && this.props.inputRef(input)}
            />
          ) : (
            <View pointerEvents="none">
              <TextInput
                {...props}
                onContentSizeChange={event => {
                  this.setState({ height: event.nativeEvent.contentSize.height });
                }}
                ref={input => this.props.inputRef && this.props.inputRef(input)}
              />
            </View>
          )
        ) : this.props.editable ? (
          <TextInput
            {...props}
            onContentSizeChange={event => {
              this.setState({ height: event.nativeEvent.contentSize.height });
            }}
          />
        ) : (
          <View pointerEvents="none">
            <TextInput
              {...props}
              onContentSizeChange={event => {
                this.setState({ height: event.nativeEvent.contentSize.height });
              }}
            />
          </View>
        )}
      </View>
    );
  }
});

var labelStyleObj = {
  marginTop: 21,
  paddingLeft: 9,
  color: '#AAA',
  position: 'absolute'
};

if (Platform.OS === 'web') {
  labelStyleObj.pointerEvents = 'none';
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
    marginTop: 20
  },
  label: labelStyleObj
});

module.exports = FloatingLabel;
