import React, { useEffect, useState } from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';
import { FadeLoading } from 'react-native-fade-loading';


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
    outputRange: ['#c5c7ca', '#929395', '#fff'],

  });

  useEffect(() => {
    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FadeLoading
      style={styles.skeleton}
      children={''}
      primaryColor={'#a6abe2'}
      secondaryColor={'#b391e8'}
      duration={0}
      visible={true}
      animated={true}
    />
    // <Animated.View style={[styles.skeleton, { backgroundColor }]} />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    borderRadius: 6,
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    zIndex:-1
  },
});

export default ImagePlaceholder;