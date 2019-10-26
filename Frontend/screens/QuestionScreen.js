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
      userid: 'user124',
      model_p: '',
      carType_p: '',
      typeOfFuel_p:'',
      manDate_p: new Date(),
      startHeat_p:  new Date(),
      endHeat_p: new Date(),
      typeOfHeat_p: '',
      heatinLevel_p: '',
      heatinLevel_p: '',
      energyProvider:'',
      solar:'',
      distTo: "KL",
      distFrom: "Mn",
      litresUsed: "15"
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
  submitUserData = () => {
    console.log(JSON.stringify(this.state));
    fetch("http://194.94.239.36:5000/form", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.props.navigation.navigate('Home');
      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <ScrollView>
      <Layout style={styles.container}>
        
        <Text>What is the Model of your vehicle?</Text>
        <Select
          style={styles.input}
          data={this.models}
          placeholder='Model'
          selectedOption={this.state.model_p}
          onSelect={(model_p)=>{this.setState({model_p})}}
        />
        
        <Text>What is your car type?</Text>
        <Select
          style={styles.input}
          data={this.carTypes}
          placeholder='Car Type'
          selectedOption={this.state.carType_p}
          onSelect={(carType_p) => {this.setState({carType_p})}}
        />

        <Text>Which type of fuel you use?</Text>
        <Select
          style={styles.input}
          data={this.fuelTypes}
          placeholder='Fuel Type'
          selectedOption={this.state.typeOfFuel_p}
          onSelect={(typeOfFuel_p) => {this.setState({typeOfFuel_p})}}
        />

        <Text>Car manufacturing date:</Text>
        <Datepicker
          date={this.state.manDate_p}
          onSelect={(manDate_p)=>{this.setState({manDate_p})}}
        />

        <Text>{'\n'}Heater Type:</Text>
        <Select
          style={styles.input}
          data={this.heaterTypes}
          placeholder='Fuel Type'
          selectedOption={this.state.typeOfHeat_p}
          onSelect={(typeOfHeat_p) => {this.setState({typeOfHeat_p})}}
        />

        <Text>Approximate Heating Start date:</Text>
        <Datepicker
          date={this.state.startHeat_p}
          onSelect={(startHeat_p)=>{this.setState({startHeat_p})}}
        />

        <Text>Approximate Heading End date:</Text>
        <Datepicker
          date={this.state.endHeat_p}
          onSelect={(endHeat_p)=>{this.setState({endHeat_p})}}
          
        />

        <Text>Heating level:</Text>
        <Select
          style={styles.input}
          data={this.heatingLevels}
          placeholder='Heating level'
          selectedOption={this.state.heatinLevel_p}
          onSelect={(heatinLevel_p)=>{this.setState({heatinLevel_p})}}
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
        
        <Button style={styles.input} status='success' onPress={this.submitUserData}>Submit</Button>
      </Layout>
      </ScrollView>
    );
  }
}

QuestionScreen.navigationOptions = {
  headerTitle: "",
  
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  input: {
    marginVertical: 4,
  },
});