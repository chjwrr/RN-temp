
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {styles} from './styles'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Colors from '@/utils/colors';

const tabbars:any[] = [
  {
    title:'衣互',
    icon:require('@/assets/images/Home_nor.png'),
    iconSel:require('@/assets/images/Home_sel.png'),
  },
  {
    title:'票儿',
    icon:require('@/assets/images/Ticket_nor.png'),
    iconSel:require('@/assets/images/Ticket_sel.png')
  },
  {
    title:'发布',
    icon:require('@/assets/images/Post.png'),
    iconSel:require('@/assets/images/Post.png')
  },
  {
    title:'生态',
    icon:require('@/assets/images/Ecology_nor.png'),
    iconSel:require('@/assets/images/Ecology_sel.png')
  },
  {
    title:'我的',
    icon:require('@/assets/images/Mine_nor.png'),
    iconSel:require('@/assets/images/Mine_sel.png')
  },
]

export default function CustomTabbar(props:BottomTabBarProps): JSX.Element {
  return (
    <View style={[styles.main,{
      backgroundColor:props.state.index == 1 ? Colors.black : Colors.white
    }]}>
      <StatusBar barStyle={props.state.index == 1 ? 'light-content' : 'dark-content'} translucent={ true } backgroundColor="transparent" />

      {props.state.routes.map((route:any, index:number) => {
        const { options } = props.descriptors[route.key];

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
            onPressIn={onPress}
            onLongPress={onLongPress}
            style={styles.tabbar}
          >
            <Image style={index !== 2 ? styles.tabbaricon : styles.tabbariconBig} source={isFocused ? tabbars[index].iconSel :  tabbars[index].icon}/>
            <Text style={[styles.tabbartitle,{ color: isFocused ? Colors.tabbar : Colors.light}]}>
              {tabbars[index].title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
