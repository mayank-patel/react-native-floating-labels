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

    componentWillReceiveProps(props) {
        if (typeof props.value !== 'undefined' && props.value !== this.state.text) {
            this.setState({
                text: props.value,
                dirty: !!props.value
            });
            this._animate(!!props.value, props)
        }
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
            this.props.onFocus(...args);
        }
    };

    _handleBlur = () => {
        if (!this.state.text) {
            this._animate(false, this.props);
            this.setState({dirty: false});
        }

        if (this.props.onBlur) {
            this.props.onBlur(...args);
        }
    };

    _handleChangeText = (text) => {
        this.setState({text});

        if (this.props.onChangeText) {
            this.props.onChangeText(text)
        }
    };

    _handleEndEditing = (event) => {
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
                {this.props.label}
            </Animated.Text>
        )
    };

    render() {
        const props = {
            ...this.props,
            onBlur: this._handleBlur,
            onChangeText: this._handleChangeText,
            onEndEditing: this._handleEndEditing,
            onFocus: this._onFocus,
            style: [
                styles.input,
                this.props.inputStyle
            ]
        };
        const elementStyles = [styles.element, this.props.style];

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
