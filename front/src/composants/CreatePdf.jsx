import React from 'react';
import { PDFDownloadLink, Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';

const DisplayDate = ()=>{
  const date = new Date();
  const param = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const TodayDate = date.toLocaleDateString('fr-FR', param );
  return TodayDate;
}



const createPDF = (data) => {

  const Today_Date = DisplayDate();

  return(
    <Document>
    <Page style={styles.page}>
      <View style={styles.head} >
        <Text style={styles.date}>{Today_Date}</Text>
      </View>
      
      <Text style={styles.title}>Bon de Commande</Text>
      
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

  )

}


export default createPDF;

  const styles = StyleSheet.create({
    page: {
      display:'flex',
      flexDirection: 'colunm',
      backgroundColor: '#ffffff',
      padding: 50,
    },

    head:{
      width: '100%',
      display:'flex',
      justifyContent:'flex-end',
      marginBottom: 30
    },

    title:{
      color:'black',
      fontSize: 13,
      fontWeight: 800,
      textAlign: 'center',
      marginBottom: 20

    },
    date:{
      color:'black',
      fontSize: 9,
      fontWeight:400,
      textAlign: 'right', 
     
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
      fontWeight: 600,
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