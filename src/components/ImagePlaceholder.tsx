import React, { useEffect, useState } from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';

const ImagePlaceholder = () => {
  const [animated] = useState(new Animated.Value(0));

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animated, {
        toValue: 1,
        duration: 300,
        easing: Easing.bezier(0.3, 0.49, 0.71, 0.5),
        useNativeDriver: false,
      }),
    ).start();
  };

  const backgroundColor = animated.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#EDF1F7', '#c7c9cc', '#EDF1F7'],
  });

  useEffect(() => {
    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Animated.View style={[styles.skeleton, { backgroundColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 6,
  },
});

export default ImagePlaceholder;