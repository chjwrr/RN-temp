
import React from 'react';
import {
  SafeAreaView,
  Text,
  View
} from 'react-native';
import {styles} from './styles'

function Login(): JSX.Element {
  return (
    <SafeAreaView>
     <View style={styles.mainView}>
        <Text>Login</Text>
     </View>
    </SafeAreaView>
  );
}

export default Login;
