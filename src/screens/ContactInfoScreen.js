import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const ContactInfoScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../images/logo.png')} style={styles.logo} />
      <Text style={styles.sectionTitle}>Congenital Heart Center Clinic List</Text>
      <Text style={styles.sectionTitle}>
        Pediatric Cardiology/Congenital Heart Group
      </Text>
      <Text style={styles.text}>Call to Schedule: 1-717-531-8909</Text>
      <Text style={styles.sectionTitle}>Locations:</Text>
      <Text style={styles.text}>    · PSH Specialty Clinic 121 Nyes Road Suite D Harrisburg, PA</Text>
      <Text style={styles.text}>    · PSH Pediatric Specialties Clinic 130 Leader Heights Rd York, PA</Text>
      <Text style={styles.text}>    · PSH Children’s Lancaster pediatric Center 1430 Harrisburg Pike Lancaster, PA</Text>
      <Text style={styles.text}>    · PSH Pediatric Specialties Clinic 655 Walnut St West Reading, PA</Text>
      <Text style={styles.text}>    · PSH Medical Group 303 Benner Pike State College, PA</Text>

      <Text style={styles.sectionTitle}>Adult Congenital Heart Disease</Text>
      <Text style={styles.text}>Call to Schedule: 1-877-467-7484 (8am-5pm)</Text>
      <Text style={styles.text}>Pacemaker Clinic: 1-717-531-6833</Text>
      <Text style={styles.text}>Anticoagulation Clinic: 1-717-531-531</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 280,
    height: 130,
    resizeMode: 'contain',
  },
  header: {
    height: 60, // Set a fixed height for the header
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default ContactInfoScreen;