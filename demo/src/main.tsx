import React from 'react';
import {createRoot} from 'react-dom/client';
import {AppRegistry} from 'react-native';
import App from './App';

// Register with react-native-web
AppRegistry.registerComponent('App', () => App);

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
