import React from 'react';
import { Button, ScrollView, View, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { RkButton, RkText, RkStyleSheet, RkTheme } from 'react-native-ui-kitten';
import Moment from 'moment';
import { graphql, ApolloProvider, Query } from 'react-apollo';
import gql from "graphql-tag";
import ReceiptListComponent from './ReceiptListComponent';

const ApolloBoost = require('apollo-boost');
const ApolloClient = ApolloBoost.default;

const client = new ApolloClient({
  uri: "http://5481fb4e.ngrok.io/graphql"
});

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      profileInfo: {
        photo: require('./assets/images/avatar.png'),
        localRank: {
          value: 'Top 5 %',
          region: 'in Switzerland'
        },
        friendRank: {
          value: '#2'
        }
      },
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
      ],
      achievements: [
        {
          name: 'Carbon Saver',
          date: '2018-09-14T09:00:00'
        }
      ],
      receipts: [
        {
          shopName: 'Migros',
          value: 'CHF 110.50',
          date: '2018-09-09T00:00:00'
        },
        {
          shopName: 'Coop',
          value: 'CHF 34.10',
          date: '2018-09-14T02:00:00'
        },
        {
          shopName: 'Coop',
          value: 'CHF 17.99',
          date: '2018-09-05T00:00:00'
        },
      ]
    };
  }

  renderProfileInfo(profileInfo) {
    return (
      <View style={styles.profileInfoRank}>
        <View>
          <RkText style={styles.profileInfoValue}>{profileInfo.localRank.value}</RkText>
          <RkText style={styles.profileInfoDescription}>{profileInfo.localRank.region}</RkText>
        </View>
        <View>
        <Image style={styles.profileInfoAvatar} source={profileInfo.photo}/>
        </View>
        <View>
          <RkText style={styles.profileInfoValue}>{profileInfo.friendRank.value}</RkText>
          <RkText style={styles.profileInfoDescription}>among friends</RkText>
        </View>
      </View>
    )
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
        <View style={styles.profileInfo}>
          {this.renderProfileInfo(this.data.profileInfo)}
        </View>
        <View style={styles.statItems}>
          {this.data.statItems.map(item => this.renderStatItem(item))}
        </View>
        <View style={styles.logEntries}>
          <ReceiptListComponent />
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
  profileInfoRank: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginVertical: 15,
  },
  profileInfoValue: {
    fontSize: 22,
    color: '#646464',
    alignSelf: 'center'
  },
  profileInfoAvatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
  },
  profileInfoDescription: {
    fontSize: 12,
    color: '#646464',
    alignSelf: 'center'
  },
  statItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
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
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  statItemName: {
    color: 'white',
    fontSize: 10,
    alignSelf: 'flex-end',
    fontWeight: 'bold'
  },
  logEntries: {
    marginTop: 10,
    marginHorizontal: -15
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
    return (
      <ApolloProvider client={client}>
        <RootStack />
      </ApolloProvider>
    )
  }
}
