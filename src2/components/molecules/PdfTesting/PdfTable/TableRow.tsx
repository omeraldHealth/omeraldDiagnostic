import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

// Border color constant
const borderColor = '#90e5fc';

// Styles for the table row
const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontWeight: 'bold', // Changed fontStyle to fontWeight for bold text
  },
  description: {
    width: '45%',
    textAlign: 'left',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  result: {
    width: '10%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: 'right',
    paddingRight: 8,
  },
  unit: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: 'right',
    paddingRight: 8,
  },
  range: {
    width: '30%',
    textAlign: 'right',
    paddingRight: 8,
  },
});

// TableRow component
const TableRow: React.FC<{ items: any[] }> = ({ items }) => {
  // Create rows based on the provided items
  const rows = items.map((item) => (
    <View style={styles.row} key={item.keyword}>
      <Text style={styles.description}>{item.keyword}</Text>
      <Text style={styles.result}>{item.value}</Text>
      <Text style={styles.unit}>{item.unit}</Text>
      <Text style={styles.range}>{item.normalRange}</Text>
    </View>
  ));

  return <Fragment>{rows}</Fragment>;
};

export default TableRow;
