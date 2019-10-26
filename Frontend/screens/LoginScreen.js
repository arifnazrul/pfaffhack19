import React, { Component } from 'react';
import { Alert, StyleSheet } from 'react-native';
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
    // this.props.navigation.navigate('Question');

    // Alert.alert('Credentials', `${username} + ${password}`);
    // if (username.toLowerCase() != "admin" && password.toLowerCase() != "admin") {
    //   Alert.alert("Incorrect username of password");
    // } else {
    //   this.props.navigation.navigate('Home');
    // }
    console.log(JSON.stringify(this.state));
    fetch("http://194.94.239.36:5000/login", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: "user124", password: "user124" }),
    })
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.userid) {
          this.props.navigation.navigate('Home');
        } else {
          Alert.alert("Incorrect username of password");
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Layout style={styles.container}>
        <Text category='h1' style={{ textAlign: "center" }}>CO2Analyzer</Text>
        <Input
          style={styles.input}
          status='success'
          placeholder='username'
          value={this.state.username}
          onChangeText={(username) => this.setState({ username: username.toLowerCase() })}
        />
        <Input
          style={styles.input}
          status='success'
          placeholder='password'
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button style={styles.input} status='success' onPress={this.onLogin.bind(this)}>LOGIN</Button>
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
