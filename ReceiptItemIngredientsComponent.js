import React from 'react';
import { Button, ScrollView, View, Image, TouchableHighlight } from 'react-native';
import { RkButton, RkText, RkStyleSheet, RkTheme } from 'react-native-ui-kitten';

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
  logEntryValue: {
    fontWeight: '500'
  },
  logEntryDate: {
    marginTop: 3,
    color: '#8E8E93',
  },
  logEntryBadgeSingleLine: {
    alignSelf: 'flex-end',
  }
}));

const ReceiptItemIngredientsComponent = (props) => {
  ingredients = props.receiptItem.itemingredientSet.edges.map((edge) => edge.node);
  ingredients = Object.values(ingredients);
  return (<View>
      {ingredients.map(ingredient => (
        <View style={styles.logEntry} key={ingredient.id}>
          <RkText style={styles.logEntryValue}>
            {ingredient.displayName}
          </RkText>
          <RkText style={[styles.logEntryBadgeSingleLine, {color: colourCodeCo2Level(receipt.totalCo2Fp)}]}>
            {ingredient.relativeCo2Fp.toFixed(2)} kg CO2 per kg of product
          </RkText>
        </View>
      ))}
    </View>
  )
}

export default ReceiptItemIngredientsComponent;
