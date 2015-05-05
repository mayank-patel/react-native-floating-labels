'use strict';
var React = require('react-native');

var {
  StyleSheet,
  TextInput,
  LayoutAnimation,
  Text,
  View,
} = React;

class FloatingLabel extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      text: '',
      dirty: false,
    };
  }

  onFocus () {
    setTimeout(function () {
      LayoutAnimation.configureNext(animations.layout.easeInEaseOut);
      this.setState({dirty: true});

      if (this.props.onFocus) {
      	this.props.onFocus();
      }
    }.bind(this), 0);
  }

  onBlur () {
    setTimeout(function () {
      console.log("#### Blur: " + this.state.text);

      if (this.state.text === '') {
	      LayoutAnimation.configureNext(animations.layout.easeInEaseOut);
	      this.setState({dirty: false});
      }

      if (this.props.onBlur) {
		this.props.onBlur();
      }
    }.bind(this), 0);
  }

  updateText(text) {
  	
  	this.setState({
  		text: text
  	});

  	console.log("#### Change: " + this.state.text);
  }

  render() {
    var dirty = this.state.dirty;

    var label = (
      <Text ref='label' style={label = dirty ? styles.labelDirty : styles.labelClean}>
		{this.props.children}
      </Text>);


    return (
  		<View style={{position: 'relative'}}>
        {label}
        <TextInput
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onEndEditing={(event) => this.updateText(event.nativeEvent.text)}
          placeholderTextColor="#FF0000"
          returnKeyType="next"
          style={styles.input}
        >
        </TextInput>
      </View>
    );
  }
};

var styles = StyleSheet.create({
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
    margin: 20,
    marginBottom: 0,
  },
  labelClean: {    
    margin: 21,
    paddingLeft: 9,
    color: '#AAA',
    position: 'absolute',
    fontSize: 20,
    top: 7
  },
  labelDirty: {    
    margin: 21,    
    paddingLeft: 9,
    color: '#AAA',
    position: 'absolute',
    fontSize: 12,
    top: -17,
  }
});

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