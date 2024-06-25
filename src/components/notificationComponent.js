import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AuthContext from "../context/authContext";
import UserDataContext from "../context/userContext";
import { addUserToNotif } from "../services/firebasefirestore";

const { width, height } = Dimensions.get("window");

const NotificationPopup = ({
  isResearch,
  title,
  description,
  onClose,
  notifId,
}) => {
  const { user } = useContext(AuthContext);
  const { userData } = useContext(UserDataContext);

  const handleResponse = async (response) => {
    if (response === "yes") {
      try {
        await addUserToNotif(
          user.email,
          userData.diagnosis,
          userData.dob,
          notifId
        );
        Alert.alert(
          "Response Recorded",
          "You will be contacted about further about this study."
        );
      } catch (error) {
        console.log(error);
      }
    }
    onClose();
  };

  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#001f54" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {isResearch && (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleResponse("yes")}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleResponse("no")}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContainer: {
    width: width * 0.8,
    height: height * 0.5,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#001f54",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#001f54",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  button: {
    backgroundColor: "#001f54",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
});

export default NotificationPopup;
