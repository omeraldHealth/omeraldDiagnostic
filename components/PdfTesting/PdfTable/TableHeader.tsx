import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  description: {
    width: "45%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  result: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  units: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  ranges: {
    width: "30%",
  },
});

const TableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.description}>Test Description</Text>
    <Text style={styles.result}>Result</Text>
    <Text style={styles.units}>Units</Text>
    <Text style={styles.ranges}>Reference Ranges</Text>
  </View>
);

export default TableHeader;
