import React from 'react';
import { Button, ScrollView, View, Image, TouchableHighlight } from 'react-native';
import { FETCH_RECEIPTS } from './queries';
import { graphql, Query } from 'react-apollo';
import { RkButton, RkText, RkStyleSheet, RkTheme } from 'react-native-ui-kitten';
import Moment from 'moment';

const colourCodeCo2Level = (value) => {
  if (value < 6.0) {
    return 'black';
  } else if (value < 12.0) {
    return '#FDA80B';
  } else {
    return '#E14C2A';
  }
}


const styles = RkStyleSheet.create(theme => ({
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
  logEntryBadge: {
    alignSelf: 'flex-end',
    marginTop: -18,
  }
}));

const ReceiptListComponent = (props) => {
  return (<Query query={FETCH_RECEIPTS}>
    {({loading, error, data}) => {
      //Show an alert if there is an error
      if (error) {
        // Alert.alert("Error", "Could not fetch receipts");
        console.log(error);
        return null;
      }

      // Show a loading screen if the query is not yet finished
      if (loading) {
        return (
          <View style={styles.logEntryNoBorder}>
            <RkText>Loading receipts …</RkText>
          </View>
        )
      }

      receipts = data.allReceipts.edges.map((edge) => edge.node);
      receipts = Object.values(receipts);
      receipts = receipts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      for (receipt of receipts) {
        totalPrice = 0;
        totalCo2Fp = 0;
        for (item of receipt.itemSet.edges) {
          totalPrice += item.node.price;
          itemCo2Fp = 0;
          for (ingredient of item.node.itemingredientSet.edges) {
            ingredient = ingredient.node;
            ingredient.relativeCo2Fp = ingredient.co2Fp / ingredient.concentration;
            // relativeEnergyFp = ingredient.energyFp / ingredient.concentration;
            // relativeWaterFp = ingredient.waterFp / ingredient.concentration;
            itemCo2Fp += ingredient.co2Fp;
            // console.log('ingredientCo2Fp: ' + ingredient.co2Fp);
          }
          totalCo2Fp += itemCo2Fp;
          item.node.itemCo2Fp = itemCo2Fp;
          // console.log('itemCo2Fp: ' + ingredient.co2Fp);
        }
        totalPrice = totalPrice.toFixed(2);
        receipt.totalPrice = totalPrice;
        receipt.totalCo2Fp = totalCo2Fp;
        console.log(receipt);
      }
      console.log(receipts);

      // Render the list
      return (
        <View>
          {receipts.map(receipt => (
            <TouchableHighlight
              key={receipt.id}
              onPress={() =>
                props.navigate('Receipt', { receipt: receipt })
              }>
              <View style={styles.logEntry}>
                <RkText style={styles.logEntryValue}>
                  {receipt.shop} ({receipt.currency} {receipt.totalPrice})
                </RkText>
                <RkText style={styles.logEntryDate}>
                  {Moment(receipt.timestamp).format('MMMM DD, YYYY')}
                </RkText>
                <RkText style={[styles.logEntryBadge, {color: colourCodeCo2Level(receipt.totalCo2Fp)}]}>
                  {receipt.totalCo2Fp.toFixed(2)} kg CO2
                </RkText>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      );
    }}
  </Query>)
}

export default ReceiptListComponent;
