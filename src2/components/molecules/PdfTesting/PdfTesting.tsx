import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import dayjs from 'dayjs';
import React from 'react';
import { PdfTestingProps } from './PdfTesting.interface';
import PdfTable from './PdfTable/PdfTable';

// Styles for the PDF document
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomSection: {
    margin: 30,
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  metaDataContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  patientDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  testName: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#45A19E',
    padding: 8,
  },
  boldText: {
    fontFamily: 'Helvetica-Bold',
  },
  footerContent: {
    marginTop: 6,
    paddingTop: 4,
    borderTop: '2px solid gray',
    color: 'gray',
    fontSize: 8,
  },
  authorization: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageDimensions: {
    width: '100',
    aspectRatio: 16 / 9,
  },
});

// Component for rendering the PDF
const PdfTesting: React.FC<PdfTestingProps> = ({
  report,
  diagnosticDetails,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logo}>
          {/* Logo */}
          <Image
            style={styles.imageDimensions}
            src={{
              uri: `${diagnosticDetails?.brandDetails.brandLogo}`,
              method: 'GET',
              headers: { 'Cache-Control': 'no-cache' },
              body: '',
            }}
          />
        </View>

        <View style={styles.metaDataContainer}>
          {/* Patient Details */}
          <View id="patientDetails" style={styles.patientDetailsContainer}>
            <Text>
              Patient Name:{' '}
              <Text style={styles.boldText}>{report.userName}</Text>
            </Text>
            {/* ... other patient details ... */}
          </View>

          {/* Additional Details */}
          <View style={styles.patientDetailsContainer}>
            <Text>Lab Code:</Text>
            {/* ... other details ... */}
          </View>
        </View>

        {/* Test Name */}
        <View style={styles.testName}>
          <Text style={styles.boldText}>{report.testName}</Text>
        </View>

        {/* Report Table */}
        <View>
          <View id="reportTable">
            <PdfTable data={report.parsedData} />
          </View>
        </View>

        {/* Bottom Section (Footer) */}
        <View style={styles.bottomSection}>
          <View style={styles.authorization}>
            {/* Diagnostic Center Logo */}
            <Image
              src="https://res.cloudinary.com/drjut62wv/image/upload/v1677945620/omerald/diagnosticCenter/onlyOmeraldLogo_kwbcj8.png"
              style={{ width: '100', height: '100' }}
            />
          </View>

          {/* Footer Content */}
          <Text style={styles.footerContent}>
            This is an electronically authenticated report. Report printed date:
            {dayjs(new Date()).format('DD/MM/YYYY HH:mm')}
            NOTE: Assay results should be correlated clinically with other
            clinical findings and the total clinical status of the patient.
            MC-3860 Accredited parameter when processing in Hyderabad, main
            laboratory
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfTesting;
