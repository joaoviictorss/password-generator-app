import PasswordItem from "@/components/password-item";
import useStorage from "@/hooks/useStorage";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PasswordsPage = () => {
  const [listPasswords, setListPasswords] = useState([]);
  const focused = useIsFocused();
  const { getItem, deleteItem } = useStorage();

  useEffect(() => {
    async function getPasswords() {
      const passwords = await getItem("@pass");
      setListPasswords(passwords);
    }
    getPasswords();
  }, [focused]);

  const handleDeletePassword = async (item: string) => {
    const passwords = await deleteItem("@pass", item);
    setListPasswords(passwords);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titlePageContainer}>
        <Image
          source={require("../../assets/images/lock-icon.png")}
          style={styles.logo}
        />
        <Text style={styles.titlePage}>Senhas salvas</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          style={styles.flatList}
          data={listPasswords}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <PasswordItem
              password={item}
              removePassword={() => handleDeletePassword(item)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  titlePageContainer: {
    marginVertical: 36,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },
  titlePage: {
    color: "black",
    fontSize: 20,
  },
  logo: {
    width: 20,
    height: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: "#D5D6D8",
    borderEndStartRadius: 8,
    borderStartStartRadius: 8,
  },
  flatList: {
    marginTop: 8,
    borderEndStartRadius: 8,
    borderStartStartRadius: 8,
    flex: 1,
    overflow: "hidden",
    borderCurve: "circular",
  },
});

export default PasswordsPage;
