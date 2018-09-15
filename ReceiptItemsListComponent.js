import React from 'react';
import { Button, ScrollView, View, Image, TouchableHighlight } from 'react-native';
import { RkButton, RkText, RkStyleSheet, RkTheme } from 'react-native-ui-kitten';

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

const ReceiptItemsListComponent = (props) => {
  receiptItems = props.receipt.itemSet.edges.map((edge) => edge.node);
  receiptItems = Object.values(receiptItems);
  return (<View>
      {receiptItems.map(receiptItem => (
        <TouchableHighlight
          key={receiptItem.id}
          onPress={() =>
            props.navigate('ReceiptItem', { receiptItem: receiptItem })
          }>
          <View style={styles.logEntry}>
            <RkText style={styles.logEntryValue}>
              {receiptItem.displayName}: {receiptItem.kg} kg
            </RkText>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  )
}

export default ReceiptItemsListComponent;
