import React from 'react';
import { PDFDownloadLink, Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';

const createPDF = (data) => (
    <Document>
      <Page style={styles.page}>
        <View>{Date.now()}</View>
        <View style={styles.section}>
            <Text style={styles.headerLeft}>EXIGENCES</Text>
            <Text style={styles.headerRight}>RESULTATS</Text>
        </View>
       
        {Object.entries(data).map(([key, value]) => (
          <React.Fragment key={key}>
            <View style={styles.section}>
                <Text style={styles.leftCell}>{key}</Text>
                <Text style={styles.rightCell}>{value || '-'}</Text>
            </View>
            
          </React.Fragment>
        ))}
      </Page>
    </Document>
  );

  export default createPDF

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'colunm',
      backgroundColor: '#ffffff',
      padding: 50,
    },

    section:{
        flexDirection: 'row',
        width: '100%',

    },
    headerRight: {
      width: '50%',
      padding: 5,
      fontSize: 12,
      backgroundColor: '#007fae',
      color: '#fff',
      textAlign: 'right',

    },
    headerLeft: {
        width: '50%',
        padding: 5,
        fontSize: 12,
        backgroundColor: '#007fae',
        color: '#fff',
        textAlign: 'left',
  
      },
    leftCell: {
      width: '50%',
      padding: 5,
      fontWeight: '600',
      fontSize: 10,
      textAlign: 'left',
      
    },
    rightCell: {
      width: '50%',
      padding: 5,
      fontSize: 10,
      textAlign: 'right',
    },
  });