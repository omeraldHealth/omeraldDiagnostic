import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

// Border color constant
const borderColor = "#90e5fc";

// Styles for the table header
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
    fontWeight: "bold", // Changed fontStyle to fontWeight for bold text
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

// TableHeader component
const TableHeader: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.description}>Test Description</Text>
    <Text style={styles.result}>Result</Text>
    <Text style={styles.units}>Units</Text>
    <Text style={styles.ranges}>Reference Ranges</Text>
  </View>
);

export default TableHeader;
