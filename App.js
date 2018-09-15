import React from 'react';
import { Button, ScrollView, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { RkButton, RkText, RkStyleSheet, RkTheme } from 'react-native-ui-kitten';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      statItems: [
        {
          name: 'CO2',
          value: '+16 %',
          background: '#646464'
        },
        {
          name: 'Energy',
          value: '-22 %',
          background: '#D9B601'
        },
        {
          name: 'Water',
          value: '-2 %',
          background: '#4472EE'
        },
      ]
    };
  }

  renderStatItem(item) {
    return (
      <View style={[styles.statItemContainer, {backgroundColor: item.background}]} key={item.name}>
        <View>
          <RkText style={styles.statItemValue}>{item.value}</RkText>
          <RkText style={styles.statItemName}>{item.name}</RkText>
        </View>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.screen}>
        <View style={styles.statItems}>
          {this.data.statItems.map(item => this.renderStatItem(item))}
        </View>
      </ScrollView>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  statItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  statItemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 5,
    flex: 1,
  },
  statItemValue: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'flex-start',
  },
  statItemName: {
    color: 'white',
    fontSize: 12,
    alignSelf: 'flex-end',
    fontWeight: 'bold'
  },
}));

class ReceiptScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Receipt Screen</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Receipt: ReceiptScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
