import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, StyleSheet, Button, Alert, Pressable } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from '@expo/vector-icons';

const AddVideo = ({ navigation }) => {
  const [videoUri, setVideoUri] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

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
          placeholder="Video Title:"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Description:"
          value={description}
          onChangeText={setDescription}
          multiline
        />
          <Dropdown
            style={[styles.dropdown, ageGroup && { borderColor: "blue" }]}
            data={[
              { label: "Child", value: "1" },
              { label: "Adult", value: "2" },
              { label: "Transition", value: "3" },
            ]}
            labelField="label"
            valueField="value"
            value={category}
            placeholder={"Category:"}
            onChange={(value) => setCategory(value)} // Update state directly
          />
          {/* <Dropdown
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
            placeholder={"Age Group:"}
            onChange={(value) => setAgeGroup(value)} // Update state directly
          /> */}
        <View style={styles.thumbnailContainer}>
          <TextInput
            style={styles.thumbnailInput}
            placeholder="Choose Video"
            value={thumbnail}
            editable={false}
          />
          <TouchableOpacity style={styles.thumbnailButton} onPress={handleChooseVideo}>
            <MaterialIcons name="photo-library" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {thumbnail && (
          <Image source={{ uri: thumbnail }} style={styles.thumbnailImage} />
        )}
        <Pressable onPress={handleUploadVideo} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Upload</Text>
        </Pressable>
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
    width: '100%', 
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
  submitButton: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#001f54",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    marginBottom: 5,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  thumbnailInput: {
    flex: 1,
    height: '100%',
    borderColor: 'transparent',
  },
  thumbnailButton: {
    marginLeft: 10,
  },
  thumbnailImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default AddVideo;