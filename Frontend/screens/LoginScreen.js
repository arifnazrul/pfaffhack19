import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, SafeAreaView } from 'react-native';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  onLogin() {
    const { username, password } = this.state;
    this.props.navigation.navigate('Home');

    // Alert.alert('Credentials', `${username} + ${password}`);
    // if (username.toLowerCase() != "admin" && password.toLowerCase() != "admin") {
    //   Alert.alert("Incorrect username of password");
    // } else {
    //   this.props.navigation.navigate('Home');
    // }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Username'}
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password'}
            secureTextEntry={true}
            style={styles.input}
          />

          <Button
            title={'Login'}
            onPress={this.onLogin.bind(this)}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
