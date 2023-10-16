//@ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Button
} from 'react-native';
import {styles} from './styles'


import WaterfallFlow from 'react-native-waterfall-flow'



function Flow(): JSX.Element {
  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <WaterfallFlow
        data={[1,2,3,4,5,6,7]}
        numColumns={2}
        renderItem={({ item, index, columnIndex })=>{
          return <View style={{
            height:item * 20,
            margin:20,
            backgroundColor:'#0f0',
          }}>
            <Text>title: {item}</Text>
            <Text>index: {index}</Text>
          </View>
        }}
        style={{ flex: 1 }}
        contentContainerStyle={{ backgroundColor: '#f9f9f9' }}
        ListHeaderComponent={<View />}
        ListFooterComponent={<View/>}
        ListEmptyComponent={<View/>}
        initialNumToRender={10}
        />



    </SafeAreaView>
  );
}

export default Flow;
