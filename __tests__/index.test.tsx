import React from 'react';
import {Animated, StyleSheet, TextInput, View} from 'react-native';
import {render, screen, fireEvent, act} from '@testing-library/react-native';
import FloatingLabel, {FloatingLabelHandle} from '../src/index';

describe('FloatingLabel — core render', () => {
  it('renders without crashing', () => {
    render(<FloatingLabel>Email</FloatingLabel>);
  });

  it('renders the label text', () => {
    render(<FloatingLabel>Email</FloatingLabel>);
    expect(screen.getByText('Email')).toBeTruthy();
  });

  it('renders a TextInput', () => {
    render(<FloatingLabel>Email</FloatingLabel>);
    expect(screen.UNSAFE_getByType(TextInput)).toBeTruthy();
  });
});

describe('FloatingLabel — interaction & animation', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('focus animates label to dirty position', () => {
    const timingSpy = jest.spyOn(Animated, 'timing');
    render(<FloatingLabel>Email</FloatingLabel>);

    fireEvent(screen.UNSAFE_getByType(TextInput), 'focus');

    expect(timingSpy).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({toValue: 12, useNativeDriver: false}),
    );
    expect(timingSpy).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({toValue: -17, useNativeDriver: false}),
    );
    timingSpy.mockRestore();
  });

  it('blur with no text animates label to clean position', () => {
    const timingSpy = jest.spyOn(Animated, 'timing');
    render(<FloatingLabel>Email</FloatingLabel>);
    const input = screen.UNSAFE_getByType(TextInput);

    fireEvent(input, 'focus');
    timingSpy.mockClear();
    fireEvent(input, 'blur');

    expect(timingSpy).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({toValue: 20, useNativeDriver: false}),
    );
    expect(timingSpy).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({toValue: 7, useNativeDriver: false}),
    );
    timingSpy.mockRestore();
  });

  it('blur with text keeps label in dirty position', () => {
    const timingSpy = jest.spyOn(Animated, 'timing');
    render(<FloatingLabel>Email</FloatingLabel>);
    const input = screen.UNSAFE_getByType(TextInput);

    fireEvent(input, 'focus');
    fireEvent.changeText(input, 'hello@example.com');
    timingSpy.mockClear();
    fireEvent(input, 'blur');

    expect(timingSpy).not.toHaveBeenCalled();
    timingSpy.mockRestore();
  });

  it('calls onFocus callback when input is focused', () => {
    const onFocus = jest.fn();
    render(<FloatingLabel onFocus={onFocus}>Email</FloatingLabel>);

    fireEvent(screen.UNSAFE_getByType(TextInput), 'focus');

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur callback when input is blurred', () => {
    const onBlur = jest.fn();
    render(<FloatingLabel onBlur={onBlur}>Email</FloatingLabel>);

    fireEvent(screen.UNSAFE_getByType(TextInput), 'blur');

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('calls onChangeText with typed text', () => {
    const onChangeText = jest.fn();
    render(<FloatingLabel onChangeText={onChangeText}>Email</FloatingLabel>);

    fireEvent.changeText(screen.UNSAFE_getByType(TextInput), 'hello@example.com');

    expect(onChangeText).toHaveBeenCalledWith('hello@example.com');
  });

  it('calls onEndEditing when editing ends', () => {
    const onEndEditing = jest.fn();
    render(<FloatingLabel onEndEditing={onEndEditing}>Email</FloatingLabel>);

    fireEvent(screen.UNSAFE_getByType(TextInput), 'endEditing', {
      nativeEvent: {text: 'hello'},
    });

    expect(onEndEditing).toHaveBeenCalledTimes(1);
  });
});

describe('FloatingLabel — props & controlled value', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('applies inputStyle to the TextInput', () => {
    const inputStyle = {borderColor: 'red' as const};
    render(<FloatingLabel inputStyle={inputStyle}>Email</FloatingLabel>);
    const flat = StyleSheet.flatten(screen.UNSAFE_getByType(TextInput).props.style);
    expect(flat).toMatchObject(inputStyle);
  });

  it('applies labelStyle to the label', () => {
    const labelStyle = {color: 'blue' as const};
    render(<FloatingLabel labelStyle={labelStyle}>Email</FloatingLabel>);
    const flat = StyleSheet.flatten(screen.getByText('Email').props.style);
    expect(flat).toMatchObject(labelStyle);
  });

  it('applies style to the container View', () => {
    const containerStyle = {backgroundColor: 'yellow' as const};
    render(<FloatingLabel style={containerStyle}>Email</FloatingLabel>);
    const flat = StyleSheet.flatten(screen.UNSAFE_getByType(View).props.style);
    expect(flat).toMatchObject(containerStyle);
  });

  it('forwards secureTextEntry to the TextInput', () => {
    render(<FloatingLabel secureTextEntry>Email</FloatingLabel>);
    expect(screen.UNSAFE_getByType(TextInput).props.secureTextEntry).toBe(true);
  });

  it('treats password prop as secureTextEntry', () => {
    render(<FloatingLabel password>Email</FloatingLabel>);
    expect(screen.UNSAFE_getByType(TextInput).props.secureTextEntry).toBe(true);
  });

  it('forwards standard ref as FloatingLabelHandle', () => {
    const ref = React.createRef<FloatingLabelHandle>();
    render(<FloatingLabel ref={ref}>Email</FloatingLabel>);
    expect(ref.current).not.toBeNull();
    expect(typeof ref.current?.focus).toBe('function');
    expect(typeof ref.current?.blur).toBe('function');
    expect(typeof ref.current?.clear).toBe('function');
  });

  it('forwards deprecated myRef to the TextInput', () => {
    const myRef = React.createRef<TextInput>();
    render(<FloatingLabel myRef={myRef}>Email</FloatingLabel>);
    expect(myRef.current).not.toBeNull();
  });

  it('clear() via ref resets text and animates label to clean position', () => {
    const timingSpy = jest.spyOn(Animated, 'timing');
    const ref = React.createRef<FloatingLabelHandle>();
    render(<FloatingLabel ref={ref}>Email</FloatingLabel>);
    const input = screen.UNSAFE_getByType(TextInput);

    fireEvent.changeText(input, 'hello');
    timingSpy.mockClear();

    act(() => {
      ref.current?.clear();
    });

    expect(screen.UNSAFE_getByType(TextInput).props.value).toBe('');
    expect(timingSpy).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({toValue: 20, useNativeDriver: false}),
    );
    timingSpy.mockRestore();
  });

  it('sets underlineColorAndroid to transparent on Android', () => {
    render(<FloatingLabel>Email</FloatingLabel>);
    expect(screen.UNSAFE_getByType(TextInput).props.underlineColorAndroid).toBe('transparent');
  });

  it('starts in dirty position when value is non-empty on mount', () => {
    const timingSpy = jest.spyOn(Animated, 'timing');
    render(<FloatingLabel value="hello">Email</FloatingLabel>);
    expect(timingSpy).not.toHaveBeenCalled();
    timingSpy.mockRestore();
  });

  it('animates label when value prop changes externally', () => {
    const {rerender} = render(<FloatingLabel value="">Email</FloatingLabel>);
    const timingSpy = jest.spyOn(Animated, 'timing');

    rerender(<FloatingLabel value="hello">Email</FloatingLabel>);

    expect(timingSpy).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({toValue: 12, useNativeDriver: false}),
    );
    timingSpy.mockRestore();
  });
});
