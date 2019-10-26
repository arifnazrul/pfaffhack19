import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ToolbarAndroid,
  View,
  StatusBar,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { Grid, LineChart, XAxis, YAxis, BarChart } from 'react-native-svg-charts'
import { TopNavigationActionsShowcase } from '../components/TopNavigationContainer';
import {
  Layout,
  Text,
  Icon,
  Button,
} from 'react-native-ui-kitten';
import { tsThisType } from '@babel/types';
const data2 = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

const data = [0, 50, 10, 40, 95, 4, 24, 85]

const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 }
const xAxisHeight = 30

const MenuIcon = (style) => (
  <Icon name='menu-outline' {...style} />
);

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weeklyChart: {
        loading: false,
        data: undefined
      }
    }
  }

  componentDidMount() {
    this.fetchWeeklyData();
  }
  fetchWeeklyData = () => {
    this.setState({ weeklyChart: { ...this.state.weeklyChart, loading: true } })
    fetch("http://194.94.239.60:8080/graphWeeḱly/user124")
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          weeklyChart: {
            loading: false, data: responseJson.history.map((item) => {
              return parseFloat(item);
            })
          }
        })
      })
      .catch(error => console.log(error));
  }
  fetchForecastData = () => {
    fetch("http://194.94.239.36:5000/forecast", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid: "user124" }),
    })
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ weeklyChart: { loading: false, data: [0, 50, 10, 40, 95, 4, 24, 85] } })
      })
      .catch(error => console.log(error));
  }
  render() {
    const { weeklyChart } = this.state;
    const data = [10, 5, 25, 15, 20]

    const CUT_OFF = 20
    const Labels = ({ x, y, bandwidth, data }) => (
      data.map((value, index) => (
        <Text
          key={index}
          x={x(index) + (bandwidth / 2)}
          y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
          fontSize={14}
          fill={value >= CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}
        >
          {value}
        </Text>
      ))
    )

    return (
      <Layout style={styles.container}>
        {/* <TopNavigationActionsShowcase /> */}
        <Text style={{ fontWeight: "bold" }}>Your Weekly Consumption:</Text>
        {weeklyChart.loading && <Text>Loading...</Text>}
        {weeklyChart.data != undefined && <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
          <YAxis
            data={weeklyChart.data}
            style={{ marginBottom: xAxisHeight }}
            contentInset={verticalContentInset}
            svg={axesSvg}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              style={{ flex: 1 }}
              data={weeklyChart.data}
              contentInset={verticalContentInset}
              svg={{ stroke: 'rgb(134, 65, 244)' }}
            >
              <Grid />
            </LineChart>
            <XAxis
              style={{ marginHorizontal: -10, height: xAxisHeight }}
              data={weeklyChart.data}
              formatLabel={(value, index) => index}
              contentInset={{ left: 10, right: 10 }}
              svg={axesSvg}
            />
          </View>
        </View>
        }
        <Text style={{ fontWeight: "bold" }}>Your Monthly Consumption:</Text>

        <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
          <BarChart
            style={{ flex: 1 }}
            data={data}
            svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            contentInset={{ top: 10, bottom: 10 }}
            spacing={0.2}
            gridMin={0}
          >
            <Grid direction={Grid.Direction.HORIZONTAL} />
          </BarChart>
        </View>
        {weeklyChart.data && <Text style={{ fontWeight: "bold", paddingBottom: 10, color: "green" }}>Forecast: {weeklyChart.data[Math.floor(Math.random() * weeklyChart.data.length)]} kg CO2</Text>}

        <Button style={{...styles.input, paddingBottom: 10}} icon={(style) => (
          <Icon
            name={'eye'}
            {...style}
          />
        )} status='success'>View Suggestions</Button>
        <Button style={styles.input} icon={(style) => (
          <Icon
            name={'share'}
            {...style}
          />
        )} status='info'>Share</Button>

      </Layout>
    )
  }
}

HomeScreen.navigationOptions = {
  headerTitle: "Dashboard",
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
