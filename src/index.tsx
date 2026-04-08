import React, {useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

const cleanStyle = {fontSize: 20, top: 7};
const dirtyStyle = {fontSize: 12, top: -17};

export interface FloatingLabelHandle {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

export interface FloatingLabelProps extends Omit<TextInputProps, 'style'> {
  children?: React.ReactNode;
  disabled?: boolean;
  inputStyle?: TextInputProps['style'];
  labelStyle?: TextStyle;
  /** @deprecated Use the standard ref prop instead */
  myRef?: React.Ref<TextInput>;
  /** @deprecated Use secureTextEntry instead */
  password?: boolean;
  /** Applies to the outer container View (not the TextInput). */
  style?: ViewStyle;
}

const FloatingLabel = React.forwardRef<FloatingLabelHandle, FloatingLabelProps>(
  (
    {
      children,
      disabled,
      inputStyle,
      labelStyle,
      myRef,
      onBlur,
      onChangeText,
      onEndEditing,
      onFocus,
      password,
      placeholder,
      secureTextEntry,
      style,
      value,
      ...restInputProps
    },
    ref,
  ) => {
    const initialDirty = !!(value || placeholder);
    const [text, setText] = useState(value ?? '');
    const labelAnim = useRef({
      fontSize: new Animated.Value(initialDirty ? dirtyStyle.fontSize : cleanStyle.fontSize),
      top: new Animated.Value(initialDirty ? dirtyStyle.top : cleanStyle.top),
    });
    const isFirstRender = useRef(true);
    const inputRef = useRef<TextInput>(null);

    const animate = useCallback((isDirty: boolean) => {
      const target = isDirty ? dirtyStyle : cleanStyle;
      Animated.parallel(
        (Object.keys(target) as Array<keyof typeof target>).map((prop) =>
          Animated.timing(labelAnim.current[prop], {
            toValue: target[prop],
            duration: 200,
            useNativeDriver: false,
          }),
        ),
      ).start();
    }, []);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => {
        inputRef.current?.clear();
        setText('');
        animate(false);
      },
    }));

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      if (value !== undefined) {
        setText(value);
        animate(!!value);
      }
    }, [value, animate]);

    const handleFocus = useCallback<NonNullable<TextInputProps['onFocus']>>(
      (e) => {
        animate(true);
        onFocus?.(e);
      },
      [animate, onFocus],
    );

    const handleBlur = useCallback<NonNullable<TextInputProps['onBlur']>>(
      (e) => {
        if (!text) {
          animate(false);
        }
        onBlur?.(e);
      },
      [animate, onBlur, text],
    );

    const handleChangeText = useCallback(
      (newText: string) => {
        setText(newText);
        onChangeText?.(newText);
      },
      [onChangeText],
    );

    const handleEndEditing = useCallback(
      (e: Parameters<NonNullable<TextInputProps['onEndEditing']>>[0]) => {
        setText(e.nativeEvent.text);
        onEndEditing?.(e);
      },
      [onEndEditing],
    );

    // Merge the internal ref with the deprecated myRef prop
    const mergedRef = useCallback(
      (node: TextInput | null) => {
        (inputRef as React.RefObject<TextInput | null>).current = node;
        if (myRef) {
          if (typeof myRef === 'function') {
            myRef(node);
          } else {
            (myRef as React.RefObject<TextInput | null>).current = node;
          }
        }
      },
      [myRef],
    );

    const webLabelStyle =
      Platform.OS === 'web' ? ({pointerEvents: 'none'} as unknown as TextStyle) : undefined;

    return (
      <View style={[styles.element, style]}>
        <Animated.Text style={[labelAnim.current, styles.label, webLabelStyle, labelStyle]}>
          {children}
        </Animated.Text>
        <TextInput
          {...restInputProps}
          ref={mergedRef}
          style={[styles.input, inputStyle]}
          editable={!disabled}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          onEndEditing={handleEndEditing}
          onFocus={handleFocus}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry || password}
          underlineColorAndroid="transparent"
          value={text}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  element: {
    position: 'relative',
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
  label: {
    marginTop: 21,
    paddingLeft: 9,
    color: '#AAA',
    position: 'absolute',
  } as TextStyle,
});

FloatingLabel.displayName = 'FloatingLabel';

export default FloatingLabel;
