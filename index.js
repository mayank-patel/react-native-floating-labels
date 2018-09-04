'use strict';
import React, {Component} from 'react';

import {
    StyleSheet,
    TextInput,
    LayoutAnimation,
    Animated,
    Easing,
    Text,
    View,
    Platform
} from 'react-native';

export default class FloatingLabel extends Component {
    state = {};

    constructor(props) {
        super(props);

        const dirty = props.value || props.placeholder;
        const style = this._getStyle(dirty, props);

        this.state = {
            text: props.value,
            dirty,
            labelStyle: {
                fontSize: new Animated.Value(style.fontSize),
                top: new Animated.Value(style.top)
            }
        };
    }

    _getStyle = (dirty, props) => {
        const dirtyStyle = {
            fontSize: 14,
            top: -17,
            ...(typeof props.dirtyStyle !== 'undefined' ? props.dirtyStyle : null)
        };
        const cleanStyle = {
            fontSize: 22,
            top: 7,
            ...(typeof props.cleanStyle !== 'undefined' ? props.cleanStyle : null)
        };
        return dirty ? dirtyStyle : cleanStyle;
    };

    componentWillReceiveProps(props) {
        if (typeof props.value !== 'undefined' && props.value !== this.state.text) {
            this.setState({
                text: props.value,
                dirty: !!props.value
            });
            this._animate(!!props.value, props)
        }
    }

    _animate = (dirty, props) => {
        const nextStyle = this._getStyle(dirty, props);
        const labelStyle = this.state.labelStyle;
        const anims = Object.keys(nextStyle).map(prop => {
            return Animated.timing(
                labelStyle[prop],
                {
                    toValue: nextStyle[prop],
                    duration: 200
                },
                Easing.ease
            )
        });

        Animated.parallel(anims).start()
    };

    _onFocus = () => {
        this._animate(true, this.props);
        this.setState({dirty: true});

        if (this.props.onFocus) {
            this.props.onFocus(arguments);
        }
    };

    _onBlur = () => {
        if (!this.state.text) {
            this._animate(false, this.props);
            this.setState({dirty: false});
        }

        if (this.props.onBlur) {
            this.props.onBlur(arguments);
        }
    };

    onChangeText = (text) => {
        this.setState({text});

        if (this.props.onChangeText) {
            this.props.onChangeText(text)
        }
    };

    updateText = (event) => {
        const text = event.nativeEvent.text;
        this.setState({text});

        if (this.props.onEndEditing) {
            this.props.onEndEditing(event)
        }
    };

    _renderLabel = () => {
        return (
            <Animated.Text
                ref='label'
                style={[this.state.labelStyle, styles.label, this.props.labelStyle]}
            >
                {this.props.children}
            </Animated.Text>
        )
    };

    render() {
        const props = {
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
        };
        const elementStyles = [styles.element];

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
    }
}

const labelStyleObj = {
    marginTop: 21,
    paddingLeft: 9,
    color: '#AAA',
    position: 'absolute'
};

if (Platform.OS === 'web') {
    labelStyleObj.pointerEvents = 'none'
}

const styles = StyleSheet.create({
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
        fontSize: 22,
        borderRadius: 4,
        paddingLeft: 10,
        marginTop: 20,
    },
    label: labelStyleObj
});
