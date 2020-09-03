import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';
import {View, Button, StyleSheet} from 'react-native';
import React from 'react';

const ACTIVE_COLOR = 'blue';
const INACTIVE_COLOR = 'red';
export default function AnimatedStyleUpdateExample(props) {
  const active = useSharedValue(false);
  const color = useDerivedValue(() =>
    active.value ? ACTIVE_COLOR : INACTIVE_COLOR,
  );

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(active.value ? 250 : 50, config),
    };
  });

  const imageStyles = useAnimatedStyle(() => {
    return {
      tintColor: color.value,
    };
  });

  const textStyles = useAnimatedStyle(() => {
    return {
      color: color.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, style]} />
      <Button
        title="toggle"
        onPress={() => {
          active.value = !active.value;
        }}
      />
      <Animated.Image
        source={require('./menu.png')}
        style={[styles.image, imageStyles]}
      />
      <Animated.Text style={[styles.text, textStyles]}>Some Text</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column'},
  box: {width: 100, height: 80, backgroundColor: 'black', margin: 30},
  image: {tintColor: 'green'},
  text: {fontSize: 25},
});
