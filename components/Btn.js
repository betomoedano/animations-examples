import {
  Animated,
  Text,
  TouchableHighlight,
  StyleSheet,
  PlatformColor,
} from 'react-native';
import * as Haptics from 'expo-haptics';

export const Btn = ({ title }) => {
  // using Animated
  const animatedValue = new Animated.Value(1);

  function onPressIn() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.spring(animatedValue, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 500,
    }).start();
  }

  function onPressOut() {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      speed: 500,
    }).start();
  }

  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableHighlight
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        underlayColor={PlatformColor('systemTeal')}
        style={styles.btn}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableHighlight>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: PlatformColor('systemBlue'),
    padding: 10,
    borderRadius: 10,
    margin: 10,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
