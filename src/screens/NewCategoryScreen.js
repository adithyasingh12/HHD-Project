import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { launchImageLibrary } from 'react-native-image-picker';

const { width } = Dimensions.get('window');

const NewCategoryScreen = () => {
  const [thumbnail, setThumbnail] = useState(null);

  const handleSelectThumbnail = () => {
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        setThumbnail(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Title"
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
        />
        <View style={styles.thumbnailContainer}>
          <TextInput
            style={styles.thumbnailInput}
            placeholder="Category Thumbnail"
            value={thumbnail}
            editable={false}
          />
          <TouchableOpacity style={styles.thumbnailButton} onPress={handleSelectThumbnail}>
            <MaterialIcons name="photo-library" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {thumbnail && (
          <Image source={{ uri: thumbnail }} style={styles.thumbnailImage} />
        )}
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  form: {
    alignItems: 'center',
  },
  input: {
    width: width * 0.9,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
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
    width: width * 0.9,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  createButton: {
    width: width * 0.5,
    height: 50,
    backgroundColor: '#001f54',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewCategoryScreen;