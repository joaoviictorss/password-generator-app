import { Ionicons } from "@expo/vector-icons";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";

interface PasswordItemProps {
  password: string;
  removePassword: () => void;
}

const PasswordItem = ({ password, removePassword }: PasswordItemProps) => {
  const handleCopyPassword = async () => {
    await Clipboard.setStringAsync(password);
    alert("Senha copiada para a área de transferência");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{password}</Text>
      <View style={styles.containerActions}>
        <TouchableOpacity
          onPress={removePassword}
          style={[styles.buttons, styles.deleteButton]}
        >
          <Ionicons name="trash-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity onPress={handleCopyPassword} style={styles.buttons}>
          <Ionicons name="copy-outline" size={24} color="#28A745" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 24,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    marginBottom: 4,
  },
  text: {
    color: "black",
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: "gray",
  },
  containerActions: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  buttons: {
    padding: 2,

    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: "red",
  },
});

export default PasswordItem;
