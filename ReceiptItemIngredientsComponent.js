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

const ReceiptItemIngredientsComponent = (props) => {
  ingredients = props.receiptItem.itemingredientSet.edges.map((edge) => edge.node);
  ingredients = Object.values(ingredients);
  return (<View>
      {ingredients.map(ingredient => (
        <View style={styles.logEntry} key={ingredient.id}>
          <RkText style={styles.logEntryValue}>
            {ingredient.displayName}
          </RkText>
        </View>
      ))}
    </View>
  )
}

export default ReceiptItemIngredientsComponent;
