import { useState } from "react";
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  ImageBackground,
  Text,
  TextInput,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/Photo-BG.jpg")}
          style={styles.background}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 10 : 130,
              }}
            >

              <Text style={styles.title}>Вхід</Text>

              <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder={"Адреса електроної пошти"}
                value={state.email}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />

              <TextInput
                style={styles.input}
                placeholder={"Пароль"}
                value={state.password}
                secureTextEntry={true}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={keyboardHide}
              >
                <Text style={styles.btnText}>Увійти</Text>
              </TouchableOpacity>
              <Text style={styles.question}>Немає акаунта? Зареєструватися</Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "medium",
    lineHeight: 35,
    letterSpacing: 0.01,
    marginBottom: 25,
  },
  form: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 130,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  input: {
    backgroundColor: "#F6F6F6",
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  btn: {
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 28,
    marginBottom: 16,
    borderRadius: 100,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },
  question: {
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
  },
});
