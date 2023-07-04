import React from 'react';
import { PDFDownloadLink, Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';
import {AiOutlineFilePdf} from "react-icons/ai";


const Test2 = ({data}) => {

    const generatePDF = () => (
        <Document>
          <Page style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.headerRight}>DONNEES</Text>
                <Text style={styles.headerLeft}>RESULTAT</Text>
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
    return (
        <div className='table-Order'>
     <table >
      <thead>
        <tr>
          <th>DONNEES</th>
          <th>RESULTAT</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            <td className='left-cell'>{key}</td>
            <td className='right-cell'>{value || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <PDFDownloadLink document={generatePDF()} fileName='tableau.pdf'>
        
        {({ blob, url, loading, error }) =>
        
          loading ?  'Chargement du PDF...' : 'Télécharger le PDF' 
        }
      </PDFDownloadLink>
            
        </div>
    );
};

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
    header: {
      width: '50%',
      padding: 5,
      fontSize: 12,
      backgroundColor: '#007fae',
      color: '#fff',
      textAlign: 'center',

    },
    leftCell: {
      width: '50%',
      padding: 5,
      fontWeight: 'bold',
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

export default Test2;