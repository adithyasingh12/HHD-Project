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
  const [ageGroup, setAgeGroup] = useState("");

  return (
    <Provider theme={theme}>
      <ScrollView>
        <View style={styles.container}>
          <TextInput style={styles.input} placeholder="Title:" />
          <TextInput style={styles.input} placeholder="Description:" />
          <TextInput style={styles.input} placeholder="Contact:" />
          <Dropdown
            style={[styles.dropdown]}
            data={[
              { label: "Pediatric", value: "1" },
              { label: "Adult", value: "2" },
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
  uploadButton: {
    backgroundColor: "#000080",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
