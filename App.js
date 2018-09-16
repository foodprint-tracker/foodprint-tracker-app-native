import React from 'react';
import { Button, ScrollView, View, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { RkButton, RkText, RkStyleSheet, RkTheme } from 'react-native-ui-kitten';
import Moment from 'moment';
import { graphql, ApolloProvider, Query } from 'react-apollo';
import gql from "graphql-tag";
import ReceiptListComponent from './ReceiptListComponent';
import ReceiptItemsListComponent from './ReceiptItemsListComponent';
import ReceiptItemIngredientsComponent from './ReceiptItemIngredientsComponent';
import { RNCamera, FaceDetector } from 'react-native-camera';

const ApolloBoost = require('apollo-boost');
const ApolloClient = ApolloBoost.default;

const client = new ApolloClient({
  uri: "http://5481fb4e.ngrok.io/graphql"
});

class ScannerScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use the camera for scanning receipts.'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={() =>
              navigate('Loading')
            }
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> Scan Receipt </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  showReceipt = () => {
    const { navigate } = this.props.navigation;
    navigate('Receipt', { receipt:
      {
        "timestamp": "2018-09-16",
        "id": "UmVjZWlwdE5vZGU6MQ==",
        "shop": "MIGROS",
        "currency": "CHF",
        "itemSet": {
          "edges": [
            {
              "node": {
                "displayName": "Zwetschgen",
                "kg": 0.3,
                "id": "SXRlbU5vZGU6NQ==",
                "price": 0.6,
                "itemingredientSet": {
                  "edges": [
                    {
                      "node": {
                        "co2Fp": 0.03,
                        "energyFp": 0,
                        "waterFp": 1,
                        "displayName": "Zwetschgen",
                        "id": "SW5ncmVkaWVudE5vZGU6Mg=="
                      }
                    }
                  ]
                }
              }
            },
            {
              "node": {
                "displayName": "Croissant pur Beurre",
                "kg": 0.15,
                "id": "SXRlbU5vZGU6Mw==",
                "price": 1.2,
                "itemingredientSet": {
                  "edges": [
                    {
                      "node": {
                        "co2Fp": 0.09,
                        "energyFp": 0,
                        "waterFp": 0,
                        "displayName": "Butter",
                        "id": "SW5ncmVkaWVudE5vZGU6MQ=="
                      }
                    },
                    {
                      "node": {
                        "co2Fp": 0.02,
                        "energyFp": 0,
                        "waterFp": 0,
                        "displayName": "Flour",
                        "id": "SW5ncmVkaWVudE5vZGU6My=="
                      }
                    }
                  ]
                }
              }
            },
            {
              "node": {
                "displayName": "Laugenbrezel",
                "kg": 0.15,
                "id": "SXRlbU5vZGU6Mg==",
                "price": 1.5,
                "itemingredientSet": {
                  "edges": [
                    {
                      "node": {
                        "co2Fp": 0.09,
                        "energyFp": 0,
                        "waterFp": 0,
                        "displayName": "Butter",
                        "id": "SW5ncmVkaWVudE5vZGU6MQ=="
                      }
                    },
                    {
                      "node": {
                        "co2Fp": 0.02,
                        "energyFp": 0,
                        "waterFp": 0,
                        "displayName": "Flour",
                        "id": "SW5ncmVkaWVudE5vZGU6My=="
                      }
                    }
                  ]
                }
              }
            },
            {
              "node": {
                "displayName": "Buttergipfel Branche",
                "kg": 0.1,
                "id": "SXRlbU5vZGU6MQ==",
                "price": 1.7,
                "itemingredientSet": {
                  "edges": [
                    {
                      "node": {
                        "co2Fp": 0.09,
                        "energyFp": 0,
                        "waterFp": 0,
                        "displayName": "Butter",
                        "id": "SW5ncmVkaWVudE5vZGU6MQ=="
                      }
                    },
                    {
                      "node": {
                        "co2Fp": 0.02,
                        "energyFp": 0,
                        "waterFp": 0,
                        "displayName": "Flour",
                        "id": "SW5ncmVkaWVudE5vZGU6My=="
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      } })
  }

  render() {
    setTimeout(this.showReceipt, 1500)
    return (
      <ScrollView style={styles.screen}>
        <View style={styles.loadingScreen}>
          <RkText>Analyzing items …</RkText>
          <ActivityIndicator style={styles.loadingIndicator} />
        </View>
      </ScrollView>
    )
  }
}

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
          date: '2018-09-14T09:00:00',
          id: '0'
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

  renderAchievement(achievement, lastOne) {
    return (
      <View style={lastOne ? styles.logEntryNoBorder : styles.logEntry} key={achievement.id}>
        <RkText style={styles.logEntryValue}>
          Achievement: {achievement.name}
        </RkText>
        <RkText style={styles.logEntryDate}>
          {Moment(achievement.timestamp).format('MMMM DD, YYYY')}
        </RkText>
      </View>
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.screen}>
        <View style={styles.profileInfo}>
          {this.renderProfileInfo(this.data.profileInfo)}
        </View>
        <View style={styles.statsDescription}>
          <RkText>Progress of the last 14 days:</RkText>
        </View>
        <View style={styles.statItems}>
          {this.data.statItems.map(item => this.renderStatItem(item))}
        </View>
        <View style={styles.achievements}>
          {this.data.achievements.map((achievement, index) => {
            lastOne = false;
            if (index === this.data.achievements.length - 1) {
              lastOne = true;
            }
            return this.renderAchievement(achievement, lastOne)
          })}
        </View>
        <View style={styles.logEntries}>
          <ReceiptListComponent navigate={navigate} />
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
  loadingScreen: {
    marginTop: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIndicator: {
    marginTop: 10,
    size: 'large',
    color: '#3C9165'
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
  statsDescription: {
    paddingHorizontal: 5
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
  achievements: {
    marginTop: 10,
    marginHorizontal: -15
  },
  logEntries: {
    marginTop: 10,
    marginHorizontal: -15
  },
  logEntry: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: '#DBDADD',
    borderBottomWidth: 0.5,
  },
  logEntryNoBorder: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logEntryValue: {
    fontWeight: '500'
  },
  logEntryDate: {
    marginTop: 3,
    color: '#8E8E93',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
}));

class ReceiptScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigate } = this.props.navigation;
    const { receipt } = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.screen}>
        <View style={styles.logEntries}>
          <ReceiptItemsListComponent navigate={navigate} receipt={receipt} />
        </View>
      </ScrollView>
    );
  }
}

class ReceiptItemScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigate } = this.props.navigation;
    const { receiptItem } = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.screen}>
        <View style={styles.logEntries}>
          <ReceiptItemIngredientsComponent navigate={navigate} receiptItem={receiptItem} />
        </View>
      </ScrollView>
    );
  }
}

const ProfileStack = createStackNavigator(
  {
    Home: HomeScreen,
    Receipt: ReceiptScreen,
    ReceiptItem: ReceiptItemScreen
  },
  {
    initialRouteName: 'Home',
  }
);

const ScannerStack = createStackNavigator(
  {
    Scanner: ScannerScreen,
    Loading: LoadingScreen,
  },
  {
    initialRouteName: 'Scanner'
  }
)

const RootStack = createBottomTabNavigator(
  {
    Profile: ProfileStack,
    Scanner: ScannerStack,
  },
  {
    initialRouteName: 'Scanner'
  }
)

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <RootStack />
      </ApolloProvider>
    )
  }
}
