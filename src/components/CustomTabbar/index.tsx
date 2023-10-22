
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
} from 'react-native';
import {styles} from './styles'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function CustomTabbar(props:BottomTabBarProps): JSX.Element {
  return (
    <View style={styles.main}>
      {props.state.routes.map((route:any, index:number) => {
        const { options } = props.descriptors[route.key];
        const label = route.name;

        const isFocused = props.state.index === index;

        const onPress = () => {
          const event = props.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          props.navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabbar,{
              backgroundColor:isFocused ? 'yellow' : 'transparent'
            }]}
          >
            <Text style={{ color: isFocused ? 'red' : 'black'}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
