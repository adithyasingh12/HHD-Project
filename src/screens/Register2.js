import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import Icon from "react-native-vector-icons/FontAwesome";
import { diagnosis, doctors, raceData } from "./allthedata";

function Register2({ navigation }) {
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [zipCodeValue, setZipCodeValue] = useState("");
  const [diagnosisValue, setDiagnosisValue] = useState(null);
  const [raceValue, setRaceValue] = useState(null);
  const [birthValue, setbirthValue] = useState(null);
  const [iscardiologistValue, setIsCardiologistValue] = useState(null);
  const [CardiologistValue, setCardiologistValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dob, setDob] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(dayjs(currentDate).format("YYYY-MM-DD"));
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.textInput}
            value={firstNameValue}
            onChangeText={setFirstNameValue}
            placeholder="Enter first name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.textInput}
            value={lastNameValue}
            onChangeText={setLastNameValue}
            placeholder="Enter last name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth:</Text>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.textInput}
              value={dob}
              placeholder="YYYY-MM-DD"
              editable={true} // Make the text input non-editable
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={showDatepicker}
            >
              <Icon name="calendar" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Assigned sex at birth:</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            data={[
              { label: "Male", value: "1" },
              { label: "Female", value: "2" },
              { label: "Rather not answer", value: "3" },
            ]}
            labelField="label"
            valueField="value"
            placeholder={"Select an option"}
            value={birthValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setbirthValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select race:</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            data={raceData}
            labelField="label"
            valueField="value"
            placeholder={"Select an option"}
            value={raceValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setRaceValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Are you followed by a congenital cardiologist at Penn State:
          </Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            data={[
              { label: "Yes", value: "1" },
              { label: "No", value: "2" },
              { label: "I'd rather not answer", value: "3" },
            ]}
            labelField="label"
            valueField="value"
            placeholder={"Select an option"}
            value={iscardiologistValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setIsCardiologistValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Zip Code:</Text>
          <TextInput
            style={styles.textInput}
            value={zipCodeValue}
            onChangeText={setZipCodeValue}
            placeholder="Zip Code"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Diagnosis:</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            data={diagnosis}
            labelField="label"
            valueField="value"
            placeholder={"Select your diagnosis"}
            value={diagnosisValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setDiagnosisValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        {diagnosisValue === "16" && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Additional Diagnosis Information:</Text>
            <TextInput
              style={styles.textInput}
              value={additionalDiagnosis}
              onChangeText={setAdditionalDiagnosis}
              placeholder="Enter additional diagnosis information"
            />
          </View>
        )}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Who is your primary congenital cardiologist:
          </Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            data={doctors}
            labelField="label"
            valueField="value"
            placeholder={"Select an option"}
            value={CardiologistValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setCardiologistValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>

        <Button
          title="Register"
          color={"#001E44"}
          onPress={() => {
            navigation.navigate("Home");
            // Handle button press
            console.log("First Name:", firstNameValue);
            console.log("Last Name:", lastNameValue);
            console.log("Date of Birth:", dob);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  inputContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#001E44",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    height: 40,
    backgroundColor: "#fff",
  },
  iconContainer: {
    padding: 8,
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});

export default Register2;
