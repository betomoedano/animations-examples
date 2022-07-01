import { Animated } from 'react-native';

export const Sequence = ({ children }) => {
  const animatedValue = new Animated.Value(1);

  Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.9,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ])
  ).start();

  const box = {
    // you can add some styles here
  };

  return (
    <Animated.View style={[box, { transform: [{ scale: animatedValue }] }]}>
      {children}
    </Animated.View>
  );
};
