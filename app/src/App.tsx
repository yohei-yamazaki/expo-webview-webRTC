import React from 'react';
import { StyleSheet, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import WebView from 'react-native-webview';

import config from './config/variables.json';

export const App = () => {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: config['webRTC-client-uri'] }} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
