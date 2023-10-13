
import React from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  View
} from 'react-native';
import {styles} from './styles'

function Home({navigation}:any): JSX.Element {
  return (
    <SafeAreaView>
     <View style={styles.mainView}>
        <Text style={styles.title}>Home</Text>
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
