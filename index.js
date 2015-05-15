'use strict';
var React = require('react-native');

var {
  PropTypes,
  StyleSheet,
  TextInput,
  LayoutAnimation,
  Text,
  View,
} = React;

var FloatingLabel  = React.createClass({

  propTypes: {
    ...TextInput.propTypes,
    inputStyle: TextInput.propTypes.style,
    labelStyle: Text.propTypes.style,
    disabled: PropTypes.bool,
    style: View.propTypes.style,
  },
  

  getInitialState () {
    return {
      text: '',
      dirty: !!this.props.value,
    };
  },

  _onFocus () {
    setTimeout(function () {
      LayoutAnimation.configureNext(animations.layout.easeInEaseOut);
      this.setState({dirty: true});

      if (this.props.onFocus) {
      	this.props.onFocus(arguments);
      }
    }.bind(this), 0);
  },

  _onBlur () {
    setTimeout(function () {
      if (this.state.text === '') {
	      LayoutAnimation.configureNext(animations.layout.easeInEaseOut);
	      this.setState({dirty: false});
      }

      if (this.props.onBlur) {
		    this.props.onBlur(arguments);
      }
    }.bind(this), 0);
  },

  updateText(event) {
  	var text = event.nativeEvent.text;

  	this.setState({
  		text: text
  	});

    if (this.props.onEndEditing) {
      this.props.onEndEditing(arguments);
    }
  },

  _renderLabel () {
    var labelStyles = [];

    labelStyles.push(this.state.dirty ? styles.labelDirty : styles.labelClean);

    if (this.props.labelStyle) {
      labelStyles.push(this.props.labelStyle);
    }

    return (
        <Text 
          ref='label' 
          style={labelStyles}
        >
          {this.props.children}
        </Text>)
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
        onChangeText: this.props.onChangeText,
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
  labelClean: {    
    marginTop: 21,    
    paddingLeft: 9,
    color: '#AAA',
    position: 'absolute',
    fontSize: 20,
    top: 7
  },
  labelDirty: {    
    marginTop: 21,   
    paddingLeft: 9,
    color: '#AAA',
    position: 'absolute',
    fontSize: 12,
    top: -17,
  }
});

FloatingLabel.propTypes = {
  disabled: PropTypes.bool,
  style: Text.propTypes.style,
};

var animations = {
  layout: {    
    easeInEaseOut: {
      duration: 200,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
  },
};

module.exports = FloatingLabel;