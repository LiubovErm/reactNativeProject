import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export const CommentsScreen = ({ route }) => {
  const [photo, setPhoto] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    if (route.params) {
      setPhoto(route.params.uri);
    }
  }, [route.params]);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Image source={{ uri: photo }} style={styles.photo} />
          <View>
            <TextInput
              style={styles.input}
              placeholder={"Коментувати..."}
              placeholderTextColor={"#BDBDBD"}
            />
            <TouchableOpacity activeOpacity={0.7} style={styles.commentButton}>
              <Feather name="arrow-up" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
  },
  photo: {
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  input: {
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#E8E8E8",
    paddingLeft: 16,
    paddingRight: 50,
  },
  commentButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
});
