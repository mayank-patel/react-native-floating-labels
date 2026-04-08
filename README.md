## react-native-floating-labels

[![CI](https://github.com/mayank-patel/react-native-floating-labels/actions/workflows/ci.yml/badge.svg)](https://github.com/mayank-patel/react-native-floating-labels/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/react-native-floating-labels.svg)](https://badge.fury.io/js/react-native-floating-labels)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

An animated floating label `<TextInput>` component for React Native (iOS, Android, and web via react-native-web).

**[Live demo →](https://react-native-floating-labels.js.org)**

![Demo](https://raw.githubusercontent.com/mayank-patel/react-native-floating-labels/master/demo.gif)

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

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the development workflow, Conventional Commits format, and release process.

---

**MIT Licensed**
