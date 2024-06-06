import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from "react-native-element-dropdown";

const AddVideo = ({ navigation }) => {
  const [videoUri, setVideoUri] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [category, setCategory] = useState('');

  const onChange = (selectedValue, type) => {
    if (type === 'ageGroup') {
      setAgeGroup(selectedValue);
    } else if (type === 'category') {
      setCategory(selectedValue);
    }
  };

  const handleChooseVideo = () => {
    const options = {
      mediaType: 'video', 
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('VideoPicker Error: ', response.error);
      } else {
        setVideoUri(response.uri);
      }
    });
  };

  const handleUploadVideo = async () => {
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Video Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <View style={styles.inputContainer}>
          <Text style={[styles.label, {textAlign: 'center'}, {fontSize: 18},{ fontWeight: 'bold'},]}>Category</Text>
          <Dropdown
            style={[styles.dropdown, ageGroup && { borderColor: "blue" }]}
            data={[
              { label: "Unknown", value: "1" },
              { label: "Unknown", value: "2" },
              { label: "Unknown", value: "3" },
            ]}
            labelField="label"
            valueField="value"
            value={category}
            placeholder={"Select an option"}
            onChange={(value) => setCategory(value)} // Update state directly
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, {textAlign: 'center'}, {fontSize: 18},{ fontWeight: 'bold'},]}>Age Group</Text>
          <Dropdown
            style={[styles.dropdown, ageGroup && { borderColor: "blue" },]}
            data={[
              {label: "Kids",value: "1"},
              {label: "Teenagers",value: "2"},
              {label: "Adults",value: "3"},
              {label: "All",value: "4"},
            ]}
            labelField="label"
            valueField="value"
            value={ageGroup}
            placeholder={"Select an option"}
            onChange={(value) => setAgeGroup(value)} // Update state directly
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Choose Video" onPress={handleChooseVideo} style={styles.button} />
        </View>
        <View style={styles.buttonContainer}>
        <Button title="Upload Video" onPress={handleUploadVideo} style={styles.button} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  textArea: {
    height: 100,
  },
  dropdown: {
    margin: 10,
    width: 250, 
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderWidth: 2,
    borderColor: '#4287f5',
    borderRadius: 10,

    marginTop: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  label: {
    marginBottom: 5,
  },
});

export default AddVideo;