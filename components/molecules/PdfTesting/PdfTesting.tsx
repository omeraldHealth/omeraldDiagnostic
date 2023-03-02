// import {
//   DataTableCell,
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
// } from "@david.kucsai/react-pdf-table";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import dayjs from "dayjs";

import React from "react";
import { PdfTestingProps } from "./PdfTesting.interface";
import PdfTable from "./PdfTable/PdfTable";
const styles = StyleSheet.create({
  // pageBackground: {
  //   position: "absolute",
  //   minWidth: "100%",
  //   minHeight: "100%",
  //   height: "100%",
  //   width: "100%",
  // },
  page: {
    // margin: 10,
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomSection: {
    margin: 30,
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,

    // display: "flex",
    // flexDirection: "column-reverse",
  },
  metaDataContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  patientDetailsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  testName: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#45A19E",
    padding: 8,
  },
  boldText: {
    fontFamily: "Helvetica-Bold",
  },
  footerContent: {
    marginTop: 6,
    paddingTop: 4,
    borderTop: "2px solid gray",
    color: "gray",
    fontSize: 8,
  },
  authorization: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageDimensions: {
    width: "100",
    aspectRatio: 16 / 9,
  },
});

const PdfTesting = ({ report, diagnosticDetails }: PdfTestingProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logo}>
          <Image
            style={styles.imageDimensions}
            src={{
              uri: `${diagnosticDetails?.brandDetails.brandLogo}`,
              method: "GET",
              headers: { "Cache-Control": "no-cache" },
              body: "",
            }}
          />
        </View>

        <View style={styles.metaDataContainer}>
          <View id="patientDetails" style={styles.patientDetailsContainer}>
            <Text>
              Patient Name:{" "}
              <Text style={styles.boldText}>{report.userName}</Text>
            </Text>
            <Text>
              Age:{" "}
              <Text>{dayjs(new Date).diff(report.dob, "year")} Years</Text>
            </Text>
            <Text>
              Gender: <Text>{report.gender}</Text>
            </Text>
            <Text>
              Email Id: <Text>{report.email}</Text>
            </Text>
            <Text>
              Ref Doctor:{" "}
              <Text style={styles.boldText}>{report?.doctorName}</Text>
            </Text>
          </View>
          <View style={styles.patientDetailsContainer}>
            <Text>Lab Code:</Text>
            <Text>
              Phone Number: <Text>{report.userId}</Text>
            </Text>
            <Text>
              Registration Date:{" "}
              <Text>{dayjs(report.updatedAt).format("DD/MM/YYYY")}</Text>
            </Text>
            <Text>Approved Date:</Text>
          </View>
        </View>
        <View style={styles.testName}>
          <Text style={styles.boldText}>{report.testName}</Text>
        </View>
        <View>
          <View id="reportTable">
            <PdfTable data={report.parsedData} />
          </View>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.authorization}>
            <Image
              src="/icons/onlyOmeraldLogo.png"
              style={{ width: "100", height: "100" }}
            />
            {/* {diagnosticDetails?.managersDetail.map((manager, index) => (
              // <SignatureBlock
              //   key={index}
              //   name={manager.managerName}
              //   role={manager.managerRole}
              // />
            ))} */}
          </View>
          <Text style={styles.footerContent}>
            This is an electronically authenticated report. Report printed date
            : 12/03/2022 10:10 NOTE : Assay results should be correlated
            clinically with other clinical findings and the total clinical
            status of the patient. MC-3860 Accredited parameter when processing
            in Hyderabad, main laboratory
          </Text>
        </View>
      </Page>
    </Document>
  );
};

const SignatureBlock = ({
  name,
  role,
  signature,
}: {
  name: string;
  role: string;
  signature: string;
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
    },
    name: {
      fontSize: 15,
    },
    role: {
      fontSize: 15,
    },
    imageDimensions: {
      width: "100",
      aspectRatio: 16 / 9,
    },
  });
  return (
    <View style={styles.container}>
      <Image source={signature} style={styles.imageDimensions} />
      {/* <img className="shadow-lg" src={signature} width={150} height={25} /> */}
      <Text>{name}</Text>
      <Text>{role}</Text>
    </View>
  );
};

export default PdfTesting;
