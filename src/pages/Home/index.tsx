
import React, { useEffect, useLayoutEffect } from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  View,
  Dimensions
} from 'react-native';
import {styles} from './styles'

function Home({navigation}:any): JSX.Element {

  // useLayoutEffect(()=>{
  //   navigation.setOptions({ 
  //     // title: 'Updated!',
  //     headerTitle:()=><View style={{
  //       flex:1,
  //       width:Dimensions.get('screen').width,
  //       backgroundColor:'red',
  //       marginLeft:-16,
  //       flexDirection:'row',
  //       justifyContent:'space-between'
  //     }}>
  //       <Text>211111</Text>
  //       <Text>211111</Text>
  //     </View>,
  //     // headerRight: () => (
  //     //   <Button title="Update count" />
  //     // ),
  //     headerLeft: () => (
  //      null
  //     ),
  //     headerBackTitleVisible:false
  //    })
    
  //   },[navigation])

  return (
    <SafeAreaView>
     <View style={styles.mainView}>
        <Text style={styles.title}>Home1</Text>
        <Text style={styles.title}>bottom</Text>

        <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Detail')}
      />
     </View>
    </SafeAreaView>
  );
}

export default Home;
