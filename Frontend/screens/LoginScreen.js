import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Input,
  Layout,
  Text,
  Button
} from 'react-native-ui-kitten';
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
    this.props.navigation.navigate('Question');

    // Alert.alert('Credentials', `${username} + ${password}`);
    // if (username.toLowerCase() != "admin" && password.toLowerCase() != "admin") {
    //   Alert.alert("Incorrect username of password");
    // } else {
    //   this.props.navigation.navigate('Home');
    // }
  }

  render() {
    return (
      <Layout style={styles.container}>
        <Text category='h1' style={{textAlign:"center"}}>CO2Analyzer</Text>
        <Input
          style={styles.input}
          status='success'
          placeholder='username'
          value={this.state.primaryValue}
          onChangeText={(username) => this.setState({ username })}
        />
        <Input
          style={styles.input}
          status='success'
          placeholder='password'
          value={this.state.primaryValue}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button style={styles.input} status='success'>LOGIN</Button>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  input: {
    marginVertical: 4,
  },
});
