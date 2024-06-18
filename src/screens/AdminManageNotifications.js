import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AdminNotificationPopup from "../components/adminNotificationComponent";
import { diagnosis } from "./allthedata";
import { getAdminNotifications } from "../services/firebasefirestore";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const AdminManageNotifications = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [diagnosisValue, setDiagnosisValue] = useState([]);
  const [ageGroupValue, setAgeGroupValue] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const ageGroupData = [
    { label: "Pediatric", value: "1" },
    { label: "Transition", value: "2" },
    { label: "Adult", value: "3" },
  ];

  const fetchNotifications = async () => {
    // Simulate fetching notifications and user data based on diagnosis and age group
    const fetchedNotifications = await getAdminNotifications(
      ageGroupValue,
      diagnosisValue
    );
    setNotifications(fetchedNotifications);
  };

  const handleDelete = () => {
    console.log("Notification Deleted");
    setPopupVisible(false);
  };

  const handleEdit = (newTitle, newDescription) => {
    console.log("Edited Title:", newTitle);
    console.log("Edited Description:", newDescription);
  };

  const handleResponse = (response) => {
    console.log("User response:", response);
    setPopupVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text>Select Diagnosis:</Text>
        <SectionedMultiSelect
          styles={{ selectToggle: styles.dropdown }}
          items={[
            { name: "Pediatric", id: "1" },
            { name: "Transition", id: "2" },
            { name: "Adult", id: "3" },
          ]}
          selectText="Age Group"
          uniqueKey="name"
          searchPlaceholderText={"Choose Age Group..."}
          IconRenderer={MaterialIcons}
          confirmText="Select"
          selectedItems={ageGroupValue}
          onSelectedItemsChange={setAgeGroupValue}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <Text>Select Age Group:</Text>
        <SectionedMultiSelect
          styles={{ selectToggle: styles.dropdown }}
          items={diagnosis.map((item) => ({
            name: item.label,
            id: item.value,
          }))}
          selectText="Diagnosis"
          uniqueKey="name"
          searchPlaceholderText={"Choose diagnosis..."}
          IconRenderer={MaterialIcons}
          confirmText="Select"
          selectedItems={diagnosisValue}
          onSelectedItemsChange={setDiagnosisValue}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={fetchNotifications}>
        <Text style={styles.buttonText}>Get Notifications</Text>
      </TouchableOpacity>

      {notifications.map((notification) => (
        <TouchableOpacity
          key={notification.id}
          style={styles.notificationCard}
          onPress={() => {
            setSelectedNotification(notification);
            setPopupVisible(true);
          }}
        >
          <Text style={styles.notificationTitle}>
            {notification.data().title}
          </Text>
          <Text style={styles.notificationDescription}>
            {notification.data().description}
          </Text>
        </TouchableOpacity>
      ))}

      {isPopupVisible && selectedNotification && (
        <AdminNotificationPopup
          isResearch={selectedNotification.data().isResearch}
          title={selectedNotification.data().title}
          description={selectedNotification.data().description}
          onClose={() => setPopupVisible(false)}
          handleResponse={handleResponse}
          users={selectedNotification.data().users}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          notifId={selectedNotification.id}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: "#001f54",
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  notificationCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#001f54",
  },
  notificationDescription: {
    fontSize: 14,
    color: "#001f54",
    marginTop: 5,
  },
});

export default AdminManageNotifications;
