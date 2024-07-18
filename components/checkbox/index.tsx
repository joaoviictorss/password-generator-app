import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CeckboxProps {
  isChecked: boolean;
  setChecked: () => void;
  title: string;
}

const Checkbox = ({ isChecked, setChecked, title }: CeckboxProps) => {
  return (
    <View style={styles.checkBoxItem}>
      <Text style={styles.checkBoxItemTitle}>{title}</Text>
      <Pressable onPress={setChecked}>
        <View
          style={isChecked ? styles.customCheckedBox : styles.customCheckBox}
        >
          <Ionicons
            name="checkmark-outline"
            size={20}
            color={isChecked ? "black" : "transparent"}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  checkBoxItem: {
    justifyContent: "space-between",
    color: "#FFFFFF",
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
  },
  checkBoxItemTitle: {
    color: "black",
  },
  customCheckedBox: {
    width: 20,
    height: 20,
    backgroundColor: "#28A745",
    borderRadius: 2,
  },
  customCheckBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#28A745",
    borderRadius: 2,
  },
});

export default Checkbox;
