import React, {useState} from 'react';
import {PDFViewer} from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { SERVER_URL } from './Constants';

function MyApp() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
   
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
   
    return (
      <div>
        <Document
          file={SERVER_URL+"int/api_generator.php?api_name=export_pdf"}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }

export default MyApp;