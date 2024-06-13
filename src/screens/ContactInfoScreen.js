import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const ContactInfoScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Congenital Heart Center Clinic List</Text>
      <Text style={styles.sectionTitle}>Pediatric Cardiology/Congenital Heart Group</Text>
      <Text style={styles.text}>Call to Schedule: +1 (717) 531-8909{"\n"}</Text>
      <Text style={styles.sectionTitle}>Locations:</Text>
      <Text style={styles.locationText}>PSH Specialty Clinic</Text>
      <Text style={styles.text}>121 Nyes Road Suite D Harrisburg, PA{"\n"}</Text>
      <Text style={styles.locationText}>PSH Pediatric Specialties Clinic</Text>
      <Text style={styles.text}>130 Leader Heights Rd York, PA{"\n"}</Text>
      <Text style={styles.locationText}>PSH Children’s Lancaster pediatric Center</Text>
      <Text style={styles.text}>1430 Harrisburg Pike Lancaster, PA{"\n"}</Text>
      <Text style={styles.locationText}>PSH Pediatric Specialties Clinic</Text>
      <Text style={styles.text}>655 Walnut St West Reading, PA{"\n"}</Text>
      <Text style={styles.locationText}>PSH Medical Group</Text>
      <Text style={styles.text}>303 Benner Pike State College, PA{"\n"}</Text>

      <Text style={styles.sectionTitle}>Adult Congenital Heart Disease</Text>
      <Text style={styles.text}>Call to Schedule (8am-5pm): +1 (877) 467-7484</Text>
      <Text style={styles.text}>Pacemaker Clinic: +1 (717) 531-6833</Text>
      <Text style={styles.text}>Anticoagulation Clinic: +1(717) 531-531</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 380,
    height: 80,
    alignSelf: "center",
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: "center",
    marginVertical: 10,
  },
  header: {
    height: 60, // Set a fixed height for the header
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ContactInfoScreen;