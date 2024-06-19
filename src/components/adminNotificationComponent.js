import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const AdminNotificationPopup = ({
  isResearch,
  title,
  description,
  onClose,

  users = [],

  notifId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  useEffect(() => {
    console.log("Users:", users);
  }, [users]);

  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#001f54" />
          </TouchableOpacity>

          {isResearch && (
            <View style={styles.userListContainer}>
              <Text>List of Users who said yes</Text>
              <FlatList
                data={users}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.userItem}>
                    <Text style={styles.userName}>{item}</Text>
                  </View>
                )}
                ListEmptyComponent={
                  <Text style={styles.noUsersText}>No users found</Text>
                }
              />
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
    width: width * 0.9,
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
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#001f54",
    marginBottom: 20,
    fontSize: 18,
    color: "#001f54",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  editButton: {
    backgroundColor: "#FFA500",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  userListContainer: {
    width: "100%",
    maxHeight: height * 0.3,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  userName: {
    fontSize: 18,
    color: "#001f54",
  },
  noUsersText: {
    textAlign: "center",
    color: "#001f54",
    marginTop: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
});

export default AdminNotificationPopup;
