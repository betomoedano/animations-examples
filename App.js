import { StyleSheet, Text, View, Animated } from 'react-native';
import { Btn } from './components/Btn';
import { Sequence } from './components/Sequence';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>
      <Sequence>
        <FontAwesome name="bell" size={50} color="gold" />
      </Sequence>
      <Btn title="Press me" />
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
