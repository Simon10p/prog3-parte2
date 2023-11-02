import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {auth} from './src/firebase/config'
import Register from './src/screens/Register/Register'


export default function App() {
  return (
    <View style={styles.container}>
      <Text>ye</Text>
      <Register/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
