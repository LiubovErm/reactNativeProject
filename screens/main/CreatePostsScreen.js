import { useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Image
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

const initialState = {
  photo: "",
  title: "",
  location: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  const [inputState, setInputState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const sendPost = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    const post = {
      title: inputState.title,
      photo: photo,
      place: inputState.location,
      location: location,
    };
 
    navigation.navigate("DefaultPostsScreen", { post });
    setInputState(initialState);
    setPhoto(null);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Camera style={styles.camera} ref={setCamera} type={type} ratio="1:1">
          {photo && (
            <View style={styles.photoContainer}>
              <Image style={styles.photo} source={{ uri: photo }}></Image>
            </View>
          )}
          <View style={styles.iconCameraContainer}>
            <TouchableOpacity onPress={takePhoto}>
              <Feather name="camera" size={24} color="#F6F6F6" />
            </TouchableOpacity>
          </View>
        </Camera>

        <TouchableOpacity
          style={styles.toggleCameraBtn}
          onPress={toggleCameraType}
        >
          <Octicons name="sync" size={24} color="#F6F6F6" />
        </TouchableOpacity>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder={"Назва..."}
              value={inputState.title}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) =>
                setInputState((prev) => ({ ...prev, title: value }))
              }
            />
            <View style={styles.locationInputContainer}>
              <SimpleLineIcons
                style={styles.locationIcon}
                name="location-pin"
                size={24}
                color="#BDBDBD"
              />
              <TextInput
                style={styles.locationInput}
                placeholder={"Локація..."}
                value={inputState.location}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setInputState((prev) => ({ ...prev, location: value }))
                }
              />
            </View>
          </View>
        </KeyboardAvoidingView>

        <TouchableOpacity
          onPress={sendPost}
          activeOpacity={0.8}
          style={styles.sendPostButton}
        >
          <Text style={styles.buttonText}>Опублікувати</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  camera: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center", 
    height: 240,
    marginHorizontal: 16,
    marginTop: 32,
  },
  photoContainer: {
    position: "absolute",
    flexDirection: "row",
    top: 0,
    left: 0,
  },
  photo: {
    flex: 1,
    height: 240,
  },
  iconCameraContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)"
  },
  toggleCameraBtn: {
    position: "absolute",
    top: 234,
    right: 35,
    opacity: 0.8,
  },
  form: {
    marginHorizontal: 16,
    marginTop: 58,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationInputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationIcon: {
    marginRight: 8,
  },
  locationInput: {
    flex: 1,
    height: 50,
  },
  sendPostButton: {
    justifyContent: "center",
    height: 50,
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF"
  },
});
