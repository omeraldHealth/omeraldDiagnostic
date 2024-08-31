import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import TableHeader from './TableHeader';

// Styles for the PDF table
const styles = StyleSheet.create({
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#bff0fd',
  },
});

// Props type for PdfTable component
interface PdfTableProps {
  data: any[]; // Assuming data is an array of items
}

// PdfTable component
const PdfTable: React.FC<PdfTableProps> = ({ data }) => (
  <View style={styles.tableContainer}>
    {/* Table Header */}
    <TableHeader />

    {/* Uncomment the following lines if TableRow and TableFooter components are available */}
    {/* Table Rows */}
    {/* <TableRow items={data} /> */}

    {/* Table Footer (if applicable) */}
    {/* <TableFooter items={data.items} /> */}
  </View>
);

export default PdfTable;
