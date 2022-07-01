import {
  TapGestureHandler,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import {
  View,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';

export const ReanimatedExamples = () => {
  function SharedValues() {
    const randomWidth = useSharedValue(10);

    const config = {
      duration: 500,
      easing: Easing.bezier(0.5, 0.01, 0, 1),
    };

    const style = useAnimatedStyle(() => {
      return {
        width: withTiming(randomWidth.value, config),
      };
    });

    return (
      <>
        <Text style={styles.title}>shared values</Text>
        <Animated.View
          style={[
            { height: 30, backgroundColor: '#4682b4', margin: 30 },
            style,
          ]}
        />
        <Button
          title="toggle"
          onPress={() => {
            randomWidth.value = Math.random() * 350;
          }}
        />
      </>
    );
  }
  function Box() {
    const offset = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: offset.value * 255 }],
      };
    });

    const customSpringStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: withSpring(offset.value * 255, {
              damping: 40,
              stiffness: 90,
            }),
          },
          //   {
          //     rotate: withSpring(offset.value * 10),
          //   },
        ],
      };
    });

    return (
      <>
        <Text style={styles.title}>default spring</Text>
        <Animated.View style={[styles.box, animatedStyles]} />
        <Text style={styles.title}>custom spring</Text>
        <Animated.View
          style={[
            styles.box,
            { backgroundColor: '#00a86b' },
            customSpringStyles,
          ]}
        />
        <Button
          onPress={() => (offset.value = withSpring(Math.random()))}
          title="Move"
        />
      </>
    );
  }
  function WobbleExample(props) {
    const rotation = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotateZ: `${rotation.value}deg` }],
      };
    });

    return (
      <>
        <Text style={styles.title}>Modifiers</Text>
        <View style={{ flexDirection: 'row' }}>
          <Animated.View
            style={[styles.box, { backgroundColor: '#f29339' }, animatedStyle]}
          />
          <Animated.View
            style={[styles.box, { backgroundColor: '#181818' }, animatedStyle]}
          />
          <Animated.View
            style={[styles.box, { backgroundColor: '#fb607f' }, animatedStyle]}
          />
        </View>
        <Button
          title="wobble"
          onPress={() => {
            // six repetitions between the initial state of rotation (0) and value (10)
            //withRepeat method makes the animation to run in reverse every other repetition
            //Setting the reverse flag to true will result in the rotation doing three full loops
            // (from 0 to 10 and back). At the end of all six repetitions the rotation will go back to zero.
            // Here is what will happen when we click on the "wobble" button:
            // rotation.value = withRepeat(withTiming(45), 6, true)
            rotation.value = withSequence(
              withTiming(-10, { duration: 50 }),
              withRepeat(withTiming(25, { duration: 100 }), 6, true),
              withTiming(0, { duration: 50 })
            );
          }}
        />
      </>
    );
  }
  const EventsExample = () => {
    const startingPosition = 100;
    const x = useSharedValue(startingPosition);
    const y = useSharedValue(startingPosition);

    const pressed = useSharedValue(false);
    const pressed2 = useSharedValue(false);

    const eventHandler = useAnimatedGestureHandler({
      onStart: (event, ctx) => {
        pressed.value = true;
      },
      onEnd: (event, ctx) => {
        pressed.value = false;
      },
    });

    const eventHandler2 = useAnimatedGestureHandler({
      onStart: (event, ctx) => {
        pressed2.value = true;
        // using context ctx
        ctx.startX = x.value;
        ctx.startY = y.value;
      },
      onActive: (event, ctx) => {
        // x.value = startingPosition + event.translationX;
        // y.value = startingPosition + event.translationY;
        // ctx
        x.value = ctx.startX + event.translationX;
        y.value = ctx.startY + event.translationY;
      },
      onEnd: (event, ctx) => {
        pressed2.value = false;
        // x.value = withSpring(startingPosition);
        // y.value = withSpring(startingPosition);
      },
    });

    const uas = useAnimatedStyle(() => {
      return {
        backgroundColor: pressed.value ? '#181818' : 'gray',
        transform: [{ scale: withSpring(pressed.value ? 2 : 1) }],
      };
    });

    const uas2 = useAnimatedStyle(() => {
      return {
        backgroundColor: pressed2.value ? '#FEEF86' : '#001972',
        transform: [{ translateX: x.value }, { translateY: y.value }],
      };
    });

    return (
      <View style={{ paddingBottom: 300 }}>
        <Text style={styles.title}>Events</Text>
        <TapGestureHandler onGestureEvent={eventHandler}>
          <Animated.View style={[styles.ball, uas]} />
        </TapGestureHandler>
        <Text style={styles.title}>Continuous gestures</Text>
        <PanGestureHandler onGestureEvent={eventHandler2}>
          <Animated.View style={[styles.ball, uas2]} />
        </PanGestureHandler>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ flexDirection: 'column' }}>
        <SharedValues />
        <Box />
        <WobbleExample />
        <EventsExample />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 80,
    height: 80,
    backgroundColor: 'purple',
    borderRadius: 20,
    margin: 10,
  },
  ball: {
    marginTop: 30,
    width: 50,
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#f29339',
    borderRadius: 25,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
