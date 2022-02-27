import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>

        <View style={styles.toptitle}>
          <Text style={styles.title}>Bem vindo(a)</Text>
          <View
            style={styles.divider}
          />
        </View>

      <View style={styles.midcontent}>
        <View style={styles.midcontent_title}>
          <Text style={styles.midcontent_text}>Aqui você consegue:</Text>
        </View>
        
        <View style={styles.midcontent_body}>
          <Text style={styles.midcontent_body_text}>● Reconhecer uma nota e ouvir seu valor</Text>
          <Text style={styles.midcontent_body_text}>● Contar um amontado de notas</Text>
        </View>
      </View>
        

      
      <View style={styles.buttonscontent}>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.text}>Contagem de Notas da Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.text}>Contagem de Notas da Galeria</Text>
        </TouchableOpacity>

      </View>



      <View style={styles.creditsbody}>
        <Text style={styles.credits}>Creditos e Licenças</Text>
      </View>

        

      </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      height: '100%'
    },
    toptitle: {
      width: '100%',
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      paddingTop: '10%'
    },
    title:{
      width: '100%',
      color: '#2c2f30',
      opacity: 0.9,
      textAlign: 'center',
      paddingBottom: '3.5%',
      fontFamily: 'Montserrat-SemiBold',
      fontWeight: '400',
      fontSize: 30
    },
    midcontent: {
      paddingTop: '3%',
      width: '100%',
    },
    midcontent_text: {
      width: '100%',
      paddingBottom: '5%',  
      color: '#2c2f30',
      opacity: 0.8,
      textAlign: 'center',
      fontFamily: 'Montserrat-Regular',
      fontWeight: '300',
      fontSize: 24
    },
    midcontent_body_text: {
      width: '100%',
      paddingBottom: '1%',   
      marginLeft: 25,
      color: '#2c2f30',
      opacity: 0.6,
      fontFamily: 'Montserrat-Medium',
      fontWeight: '200',
      fontSize: 16
    },
    buttonscontent:{
      alignContent: 'space-between'
    },
    midcontent_body: {
      paddingBottom: '10%',  
    },
    button: {
      borderRadius: 5,
      padding: 10,
      backgroundColor: '#304d9c',
      elevation: 2,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      marginTop: 30,
      marginBottom: 30,
    },
    creditsbody: {
      position: 'absolute',
      bottom: 20
    },
    credits: {
      color: '#2c2f30',
      opacity: 0.6,
      fontFamily: 'Montserrat-Medium',
      fontWeight: '300',
      fontSize: 14
    },
    divider: {
      borderBottomColor: '#636363',
      borderBottomWidth: 3,
      opacity: 0.4,
      marginLeft: 15,
      marginRight: 15
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },

  });

export default HomeScreen;