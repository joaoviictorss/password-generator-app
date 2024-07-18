import Checkbox from "@/components/checkbox";
import { ModalPassword } from "@/components/modal";
import useStorage from "@/hooks/useStorage";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import * as Clipboard from "expo-clipboard";

type PasswordOptions = {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export default function Home() {
  const [sizeCaracteres, setSizeCaracteres] = useState(6);
  const [passwordValue, setPasswordValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [options, setOptions] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const noneOptionsSelected = Object.values(options).every((value) => !value);

  function generatePassword(length: number, options: PasswordOptions) {
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()";

    let characterPool = "";

    if (options.uppercase) {
      characterPool += upperCaseLetters;
    }
    if (options.lowercase) {
      characterPool += lowerCaseLetters;
    }
    if (options.numbers) {
      characterPool += numbers;
    }
    if (options.symbols) {
      characterPool += symbols;
    }

    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      password += characterPool[randomIndex];
    }
    setPasswordValue(password);
    setModalVisible(true);
  }

  function handleChangeOptionValue(option: string, value: boolean) {
    setOptions((prev) => {
      const newDataOption = { ...prev, [option]: value };
      return newDataOption;
    });
  }

  const handleCopyPassword = async () => {
    if (passwordValue === "") {
      return;
    }
    await Clipboard.setStringAsync(passwordValue);
    alert("Senha copiada para a área de transferência");
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titlePageContainer}>
          <Image
            source={require("../../assets/images/lock-icon.png")}
            style={styles.logo}
          />
          <Text style={styles.titlePage}>Gerador de senhas</Text>
        </View>

        <View style={styles.passwordContainer}>
          <Text style={styles.password}>{passwordValue}</Text>
          <TouchableOpacity onPress={handleCopyPassword}>
            <Ionicons name="copy-outline" size={20} color="#28A745" />
          </TouchableOpacity>
        </View>

        <View style={styles.sliderArea}>
          <Text style={styles.titleSlider}>
            Tamanho da senha | {sizeCaracteres}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={6}
            maximumValue={20}
            maximumTrackTintColor="#000E42"
            minimumTrackTintColor="#37d65c"
            thumbTintColor="#28A745"
            value={sizeCaracteres}
            onValueChange={(value) => {
              setPasswordValue("");
              setSizeCaracteres(value);
            }}
            step={1}
          />
        </View>

        <View style={styles.checkBoxContainer}>
          <Checkbox
            title="Maiusculas (A-Z)"
            isChecked={options.uppercase}
            setChecked={() =>
              handleChangeOptionValue("uppercase", !options.uppercase)
            }
          />
          <Checkbox
            title="Minusculas (a-z)"
            isChecked={options.lowercase}
            setChecked={() =>
              handleChangeOptionValue("lowercase", !options.lowercase)
            }
          />
          <Checkbox
            title="Numeros (0-9)"
            isChecked={options.numbers}
            setChecked={() =>
              handleChangeOptionValue("numbers", !options.numbers)
            }
          />
          <Checkbox
            title="Simbolos (!@#$)"
            isChecked={options.symbols}
            setChecked={() =>
              handleChangeOptionValue("symbols", !options.symbols)
            }
          />
        </View>

        <TouchableOpacity
          style={noneOptionsSelected ? styles.buttonDisabled : styles.button}
          onPress={() => generatePassword(sizeCaracteres, options)}
          disabled={noneOptionsSelected}
        >
          <Text style={styles.buttonText}>Gerar senha</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide" transparent>
          <ModalPassword
            password={passwordValue}
            handleCloseModal={() => setModalVisible(false)}
          />
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5D6D8",
    justifyContent: "center",
    alignItems: "center",
    color: "#black",
  },
  titlePageContainer: {
    marginBottom: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  titlePage: {
    color: "black",
    fontSize: 24,
  },
  logo: {
    width: 20,
    height: 20,
  },
  passwordContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "black",
    borderRadius: 8,
    width: "80%",
    height: 56,
    paddingHorizontal: 12,
    backgroundColor: "white",
  },
  password: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  sliderArea: {
    marginTop: 14,
    marginBottom: 14,
    width: "80%",
    borderRadius: 8,
    backgroundColor: "white",
    padding: 12,
  },
  slider: {
    height: 50,
  },
  titleSlider: {
    color: "black",
    marginBottom: 8,
  },
  checkBoxContainer: {
    padding: 12,
    width: "80%",
    marginBottom: 14,
    backgroundColor: "white",
    borderRadius: 8,
    flexDirection: "column",
    gap: 8,
  },
  button: {
    backgroundColor: "#28A745",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 18,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  buttonDisabled: {
    backgroundColor: "#28A745",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 18,
    opacity: 0.5,
  },
});
