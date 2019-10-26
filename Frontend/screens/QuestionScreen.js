import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Input,
  Layout,
  Text,
  Button
} from 'react-native-ui-kitten';

export default class QuestionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      model: '',
    };
  }
  

  render() {
    return (
      <Layout style={styles.container}>
        <Text>What is the Model of your vehicle?</Text>
        <Input
          style={styles.input}
          status='success'
          placeholder='Enter the model'
          value={this.state.primaryValue}
          onChangeText={(model) => this.setState({model})}
        />
        
        <Button style={styles.input} status='success'>SUCCESS</Button>
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