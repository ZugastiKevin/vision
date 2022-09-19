import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, } from 'react-native';
import Constants from 'expo-constants';
import Cam from './assets/pexels-pixabay-414781.jpg';
import Gps from './src/component/Gps/index';
import RecordingSounds from './src/component/RecordingSounds/index';
import RecordCamera from './src/component/RecordCamera/index';

export default function App() {
  useEffect(() => {

  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 400, marginTop: 30,}}
          source={Cam}
        />
        <Text style={{ marginTop: 20, }} >Vision!</Text>
        <Text style={{ marginTop: 20, }} >Click on the sentences to request permission </Text>
        <Text >↓ ↓ ↓ ↓ ↓ ↓ </Text>
        <Gps />
        <RecordCamera />
        <RecordingSounds /> 
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
