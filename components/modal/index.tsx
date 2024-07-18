import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import useStorage from "@/hooks/useStorage";

interface ModalPasswordProps {
  password: string;
  handleCloseModal: () => void;
}

export function ModalPassword({
  password,
  handleCloseModal,
}: ModalPasswordProps) {
  const { saveItem } = useStorage();

  const handleCopyPassword = async () => {
    await Clipboard.setStringAsync(password);
    saveItem("@pass", password);
    alert("Senha copiada para a área de transferência");
    handleCloseModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.modalTitle}>Senha Gerada</Text>

        <Pressable
          style={styles.innerPassword}
          onLongPress={handleCopyPassword}
        >
          <Text style={styles.password}>{password}</Text>
        </Pressable>

        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.button} onPress={handleCloseModal}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={handleCopyPassword}
          >
            <Text style={styles.buttonSaveText}>Salvar Senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(24, 24, 24, 0.65)",
  },
  modal: {
    backgroundColor: "#F3F3FF",
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    borderRadius: 8,
    paddingTop: 24,
    paddingBottom: 24,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#000000",
    marginBottom: 24,
  },
  innerPassword: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 14,
  },
  password: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  containerButtons: {
    flexDirection: "row",
    marginTop: 8,
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    marginTop: 14,
    marginBottom: 14,
    borderRadius: 8,
  },
  buttonSave: {
    backgroundColor: "#28A745",
  },
  buttonSaveText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  buttonText: {
    fontWeight: "bold",
  },
});
