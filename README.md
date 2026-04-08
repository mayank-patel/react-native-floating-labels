## react-native-floating-labels

[![CI](https://github.com/mayank-patel/react-native-floating-labels/actions/workflows/ci.yml/badge.svg)](https://github.com/mayank-patel/react-native-floating-labels/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/react-native-floating-labels.svg)](https://badge.fury.io/js/react-native-floating-labels)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

An animated floating label `<TextInput>` component for React Native (iOS, Android, and web via react-native-web).

**[Live demo →](https://react-native-floating-labels.js.org)**

![Demo](https://raw.githubusercontent.com/mayank-patel/react-native-floating-labels/main/demo.gif)

---

## Installation

```bash
npm install react-native-floating-labels
```

---

## Usage

```tsx
import FloatingLabel from 'react-native-floating-labels';

<FloatingLabel>Email</FloatingLabel>;
```

### With custom styles

```tsx
<FloatingLabel
  labelStyle={{color: '#6200ea'}}
  inputStyle={{borderColor: '#6200ea', borderWidth: 2, borderRadius: 8}}
  style={{marginBottom: 16}}
>
  Email address
</FloatingLabel>
```

### Controlled value

```tsx
const [email, setEmail] = React.useState('');

<FloatingLabel value={email} onChangeText={setEmail}>
  Email address
</FloatingLabel>;
```

### Imperative ref controls

```tsx
import FloatingLabel, {FloatingLabelHandle} from 'react-native-floating-labels';

const ref = React.useRef<FloatingLabelHandle>(null);

<FloatingLabel ref={ref}>First Name</FloatingLabel>;

ref.current?.focus();
ref.current?.blur();
ref.current?.clear();
```

---

## Props

`FloatingLabel` accepts all standard [`TextInput`](https://reactnative.dev/docs/textinput) props plus the following:

| Prop              | Type                      | Default | Description                                                  |
| ----------------- | ------------------------- | ------- | ------------------------------------------------------------ |
| `children`        | `ReactNode`               | —       | The floating label text                                      |
| `style`           | `ViewStyle`               | —       | Style for the outer container `View`                         |
| `inputStyle`      | `TextInputProps['style']` | —       | Style applied to the inner `TextInput`                       |
| `labelStyle`      | `TextStyle`               | —       | Style applied to the animated label                          |
| `disabled`        | `boolean`                 | `false` | Disables the input (`editable={false}`)                      |
| `value`           | `string`                  | —       | Controlled value; animates the label when changed externally |
| `secureTextEntry` | `boolean`                 | `false` | Hides input text (password field)                            |
| `password`        | `boolean`                 | —       | **Deprecated** — use `secureTextEntry` instead               |
| `myRef`           | `React.Ref<TextInput>`    | —       | **Deprecated** — use the standard `ref` prop instead         |

### `FloatingLabelHandle` (ref)

| Method    | Description                                                               |
| --------- | ------------------------------------------------------------------------- |
| `focus()` | Focuses the input                                                         |
| `blur()`  | Blurs the input                                                           |
| `clear()` | Clears the input text and animates the label back to its resting position |

---

## Testing locally with a React Native app

The quickest way to test the library end-to-end against a real device or simulator before publishing.

### 1. Create a test app

**Expo (recommended — no Xcode/Android Studio required for quick tests):**

```bash
npx create-expo-app@latest FloatingLabelsTest
cd FloatingLabelsTest
```

**Bare React Native:**

```bash
npx @react-native-community/cli init FloatingLabelsTest
cd FloatingLabelsTest
```

### 2. Pack the library

Run this from the library root. It produces a tarball (e.g. `react-native-floating-labels-2.0.0.tgz`) that mirrors exactly what gets published to npm:

```bash
npm run build
npm pack
```

### 3. Install the tarball in the test app

```bash
npm install /path/to/react-native-floating-labels-2.0.0.tgz
```

For Expo, no additional linking is required. For bare React Native, run `npx pod-install` on iOS.

### 4. Use it in the app

Replace the contents of `App.tsx` (or `App.js`) with:

```tsx
import React, {useRef} from 'react';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import FloatingLabel, {FloatingLabelHandle} from 'react-native-floating-labels';

export default function App() {
  const ref = useRef<FloatingLabelHandle>(null);

  return (
    <SafeAreaView style={styles.container}>
      <FloatingLabel style={styles.field}>First Name</FloatingLabel>
      <FloatingLabel style={styles.field} secureTextEntry>
        Password
      </FloatingLabel>
      <FloatingLabel ref={ref} style={styles.field}>
        Ref-controlled field
      </FloatingLabel>
      <Button title="Clear via ref" onPress={() => ref.current?.clear()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 24, backgroundColor: '#fff'},
  field: {marginBottom: 16},
});
```

### 5. Start the app

```bash
# Expo
npx expo start

# Bare React Native — iOS
npx react-native run-ios

# Bare React Native — Android
npx react-native run-android
```

### Testing the beta release from npm

If you want to test the published beta instead of a local tarball:

```bash
npm install react-native-floating-labels@beta
```

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the development workflow, Conventional Commits format, and release process.

---

**MIT Licensed**
