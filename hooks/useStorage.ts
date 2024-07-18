import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  // Buscar os items salvos
  const getItem = async (key: string) => {
    try {
      const passwords = await AsyncStorage.getItem(key);
      if (passwords) {
        return JSON.parse(passwords);
      } else {
        return [];
      }
    } catch (error) {
      console.error(`Erro ao buscar senhas: ${error}`);
      return [];
    }
  };

  // Salvar um item
  const saveItem = async (key: string, value: string) => {
    try {
      let passwords = await getItem(key);
      passwords.push(value);
      await AsyncStorage.setItem(key, JSON.stringify(passwords));
    } catch (error) {
      console.error(`Erro ao salvar senha: ${error}`);
    }
  };

  // Deletar um item
  const deleteItem = async (key: string, item: string) => {
    try {
      let passwords = await getItem(key);
      let myPasswords = passwords.filter(
        (password: string) => password !== item
      );
      await AsyncStorage.setItem(key, JSON.stringify(myPasswords));
      return myPasswords;
    } catch (error) {
      console.error(`Erro ao deletar senha: ${error}`);
    }
  };

  return {
    getItem,
    saveItem,
    deleteItem,
  };
};

export default useStorage;
