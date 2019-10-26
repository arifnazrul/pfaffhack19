import React from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import {
  Input,
  Layout,
  Text,
  Button,
  Select,
  Datepicker
} from 'react-native-ui-kitten';


export default class QuestionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      model: '',
      carType: '',
      fuelType:'',
      manufectureDate: new Date(),
      startDate:  new Date(),
      endDate: new Date(),
      heaterType: '',
      heatingLevel: '',
      electricity: '',
      energyProvider:'',
      solar:''
    };
  }

  models = [
    { text: 'Small' },
    { text: 'Compact' },
    { text: 'SUV' }
  ];

  carTypes = [
    { text: 'Hybrid' },
    { text: 'Normal' }
  ];

  fuelTypes = [
    { text: 'Petrol' },
    { text: 'Diesel' }
  ];

  date = {
    date: new Date(),
  };

  heaterTypes = [
    {text: 'Electric'},
    {text: 'Oil'},
    {text: 'Gas'},
  ];

  heatingLevels = [
    {text: 'High'},
    {text: 'Medium'},
    {text: 'Low'},
  ];

  energyProviders = [
    {text: 'Polarstern'},
    {text: 'NaturStrom'},
    {text: 'Greenpeace Energy'},
  ];

  render() {
    return (
      <ScrollView>
      <Layout style={styles.container}>
        
        <Text>What is the Model of your vehicle?</Text>
        <Select
          style={styles.input}
          data={this.models}
          placeholder='Model'
          selectedOption={this.state.model}
          onSelect={(model)=>{this.setState({model})}}
        />
        
        <Text>What is your car type?</Text>
        <Select
          style={styles.input}
          data={this.carTypes}
          placeholder='Car Type'
          selectedOption={this.state.carType}
          onSelect={(carType) => {this.setState({carType})}}
        />

        <Text>Which type of fuel you use?</Text>
        <Select
          style={styles.input}
          data={this.fuelTypes}
          placeholder='Fuel Type'
          selectedOption={this.state.fuelType}
          onSelect={(fuelType) => {this.setState({fuelType})}}
        />

        <Text>Car manufacturing date:</Text>
        <Datepicker
          date={this.state.manufectureDate}
          onSelect={(manufectureDate)=>{this.setState({manufectureDate})}}
        />

        <Text>{'\n'}Heater Type:</Text>
        <Select
          style={styles.input}
          data={this.heaterTypes}
          placeholder='Fuel Type'
          selectedOption={this.state.heaterType}
          onSelect={(heaterType) => {this.setState({heaterType})}}
        />

        <Text>Approximate Heating Start date:</Text>
        <Datepicker
          date={this.state.startDate}
          onSelect={(startDate)=>{this.setState({startDate})}}
        />

        <Text>Approximate Heading End date:</Text>
        <Datepicker
          date={this.state.endDate}
          onSelect={(endDate)=>{this.setState({endDate})}}
          
        />

        <Text>Heating level:</Text>
        <Select
          style={styles.input}
          data={this.heatingLevels}
          placeholder='Heating level'
          selectedOption={this.state.heatingLevel}
          onSelect={(heatingLevel)=>{this.setState({heatingLevel})}}
        />

        <Text>{'\n'}Electricity used per week: </Text>
        <Input
          style={styles.input}
          placeholder='Enter the value'
          value={this.state.electricity}
          onChangeText={(electricity) => this.setState({electricity})}
        />

        <Text>Energy providers:</Text>
        <Select
          style={styles.input}
          data={this.energyProviders}
          placeholder='Heating level'
          selectedOption={this.state.energyProvider}
          onSelect={(energyProvider)=>{this.setState({energyProvider})}}
        />
        
        <Text>Energy produce by Solar: </Text>
        <Input
          style={styles.input}
          placeholder='Enter the value'
          value={this.state.solar}
          onChangeText={(solar) => this.setState({solar})}
        />
        
        <Button style={styles.input} status='success'>Submit</Button>
      </Layout>
      </ScrollView>
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