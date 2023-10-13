
import React from 'react';
import {
  SafeAreaView,
  Text,
  View
} from 'react-native';
import {styles} from './styles'

function Post(): JSX.Element {
  return (
    <SafeAreaView>
     <View style={styles.mainView}>
        <Text style={styles.title}>Post</Text>
        <Text style={styles.title}>bottom</Text>
     </View>
    </SafeAreaView>
  );
}

export default Post;
