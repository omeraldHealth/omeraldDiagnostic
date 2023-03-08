import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

const styles = StyleSheet.create({
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
});

const PdfTable = ({ data }) => (
  <View style={styles.tableContainer}>
    <TableHeader />
    {/* <TableRow items={data} /> */}
    {/*<TableFooter items={data.items} />*/}
  </View>
);

export default PdfTable;
