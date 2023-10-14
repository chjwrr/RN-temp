
import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Button
} from 'react-native';
import {styles} from './styles'

function Detail({navigation}:any): JSX.Element {
  return (
    <SafeAreaView>
     <View style={styles.mainView}>
        <Text style={styles.title}>Detail</Text>
        <Text style={styles.title}>bottom</Text>
        <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Tab')}
      />
     </View>
    </SafeAreaView>
  );
}

export default Detail;
