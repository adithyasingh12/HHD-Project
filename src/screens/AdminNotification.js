import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Provider, DefaultTheme, Menu, Button } from "react-native-paper";
import { diagnosis } from "./allthedata";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200ee",
    accent: "#03dac4",
  },
};

const AdminNotification = ({ navigation }) => {
  const [ageGroupValue, setAgeGroupValue] = useState(null);
  const [diagnosisValue, setDiagnosisValue] = useState(null);
  const [notifTypeValue, setNotifTypeValue] = useState(null);
  const [ageGroup, setAgeGroup] = useState("");
  const [researchPreset, onChangeResearch] = useState('Your congenital heart team has identified you as someone potentially eligible for a current study being conducted on congenital heart disease. Would you like to be contacted about this study?');
  const [cathPreset, onChangeCath] = useState('You are scheduled for an upcoming heart catheterization at Penn State Health’s Congenital Heart Center. Enclosed, you will find instructions for this procedure:');
  const [surgeryPreset, onChangeSurgery] = useState('You are scheduled for an upcoming heart surgery at Penn State Health’s Congenital Heart Center. Enclosed, you will find instructions for this procedure:');

  return (
    <Provider theme={theme}>
      <ScrollView>
        <View style={styles.container}>
          <TextInput style={styles.input} placeholder="Title:" />
          <Dropdown
            style={[styles.dropdown]}
            data={[
              { label: "Research", value: "1" },
              { label: "Catheterization", value: "2" },
              { label: "Surgery", value: "3" },
              { label: "Other", value: "4" }
            ]}
            labelField="label"
            valueField="value"
            placeholder={"Notification Type"}
            value={notifTypeValue}
            onChange={(item) => {
              setNotifTypeValue(item.value);
            }}
          />
          {notifTypeValue === "1" && (
            <TextInput multiline style={styles.descInput} placeholder="Description:" value={researchPreset} onChangeText={onChangeResearch}/>
          )}
          {notifTypeValue === "2" && (
            <TextInput multiline style={styles.descInput} placeholder="Description:" value={cathPreset} onChangeText={onChangeCath}/>
          )}
          {notifTypeValue === "3" && (
            <TextInput multiline style={styles.descInput} placeholder="Description:" value={surgeryPreset} onChangeText={onChangeSurgery}/>
          )}
          {notifTypeValue === "4" && (
            <TextInput multiline style={styles.descInput} placeholder="Description:"/>
          )}
          <TextInput style={styles.input} placeholder="Contact:" />
          <Dropdown
            style={[styles.dropdown]}
            data={[
              { label: "Pediatric", value: "1" },
              { label: "Transition", value: "2" },
              { label: "Adult", value: "3" },
            ]}
            labelField="label"
            valueField="value"
            placeholder={"Select the age group"}
            value={ageGroupValue}
            onChange={(item) => {
              setDiagnosisValue(item.value);
            }}
          />
          <Dropdown
            style={[styles.dropdown]}
            data={diagnosis}
            labelField="label"
            valueField="value"
            placeholder={"Select the diagnosis"}
            value={diagnosisValue}
            onChange={(item) => {
              setDiagnosisValue(item.value);
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Individual Patient Email (optional):"
          />

          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  descInput: {
    height: 120,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  uploadButton: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#001f54",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
});

export default AdminNotification;
