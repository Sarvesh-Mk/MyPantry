import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

class Camera {
    constructor() {
        this.currentBarcode = 0;
    }

    async barcodeScanned(result) {
        if (result.data != this.currentBarcode) {
            this.currentBarcode = result.data;
            console.log(this.currentBarcode)
          }
    }
}


// TBD
