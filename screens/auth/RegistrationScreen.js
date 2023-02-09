import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
  avatar: "",
};

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);

  useEffect(() => {}, []);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
