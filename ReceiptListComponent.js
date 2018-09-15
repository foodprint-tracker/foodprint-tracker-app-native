import React from 'react';
import { Button, ScrollView, View, Image } from 'react-native';
import { FETCH_RECEIPTS } from './queries';
import { graphql, Query } from 'react-apollo';
import { RkButton, RkText, RkStyleSheet, RkTheme } from 'react-native-ui-kitten';
import Moment from 'moment';

const styles = RkStyleSheet.create(theme => ({
  logEntry: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: '#DBDADD',
    borderBottomWidth: 0.5,
  },
  logEntryValue: {
    fontWeight: '500'
  },
  logEntryDate: {
    marginTop: 3,
    color: '#8E8E93',
  }
}));

const ReceiptListComponent = () => {
  return (<Query query={FETCH_RECEIPTS}>
    {({loading, error, data}) => {
      //Show an alert if there is an error
      if (error) {
        Alert.alert("Error", "Could not fetch receipts");
        console.log(error);
        return null;
      }

      // Show a loading screen if the query is not yet finished
      if (loading) {
        return (
          <View style={styles.logEntry}>
            <RkText>Loading receipts …</RkText>
          </View>
        )
      }

      receipts = data.allReceipts.edges.map((edge) => edge.node);
      receipts = Object.values(receipts);
      receipts = receipts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      for (receipt of receipts) {
        totalPrice = 0;
        for (item of receipt.itemSet.edges) {
          totalPrice += item.node.price;
        }
        totalPrice = totalPrice.toFixed(2);
        receipt.totalPrice = totalPrice;
      }
      console.log(receipts);

      // Render the list
      return (
        <View>
          {receipts.map(receipt => (
            <View style={styles.logEntry} key={receipt.id}>
              <RkText style={styles.logEntryValue}>
                {receipt.shop} ({receipt.currency} {receipt.totalPrice})
              </RkText>
              <RkText style={styles.logEntryDate}>
                {Moment(receipt.timestamp).format('MMMM DD, YYYY')}
              </RkText>
            </View>
          ))}
        </View>
      );
    }}
  </Query>)
}

export default ReceiptListComponent;
