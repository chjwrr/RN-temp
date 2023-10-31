
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {styles} from './styles'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Colors from '@/utils/colors';


const tabbars:any[] = [
  {
    title:'衣互',
    icon:require('@/assets/images/Home_sel.png'),
    iconSel:require('@/assets/images/Home_sel.png'),
  },
  {
    title:'票儿',
    icon:require('@/assets/images/Ticket_nor.png'),
    iconSel:require('@/assets/images/Ticket_nor.png')
  },
  {
    title:'发布',
    icon:require('@/assets/images/Post.png'),
    iconSel:require('@/assets/images/Post.png')
  },
  {
    title:'生态',
    icon:require('@/assets/images/Ecology_nor.png'),
    iconSel:require('@/assets/images/Ecology_nor.png')
  },
  {
    title:'我的',
    icon:require('@/assets/images/Mine_nor.png'),
    iconSel:require('@/assets/images/Mine_nor.png')
  },
]

export default function CustomTabbar(props:BottomTabBarProps): JSX.Element {
  return (
    <View style={styles.main}>
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
            onPress={onPress}
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
