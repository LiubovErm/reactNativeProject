import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";

export const CommentsScreen = ({ route }) => {
  const { postId, photo } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { userId, name, avatar } = useSelector((state) => state.auth);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = async () => {
    onSnapshot(
      collection(doc(collection(db, "posts"), postId), "comments"),
      (data) => {
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );
  };

  const sendComment = async () => {
    await addDoc(collection(doc(collection(db, "posts"), postId), "comments"), {
      comment,
      name,
      userId,
      avatar,
    });
    setComment("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Image source={{ uri: photo }} style={styles.photo} />

          <FlatList
            data={allComments}
            keyExtractor={allComments.id}
            renderItem={({ item }) => (
              <View
                style={{
                  ...styles.wrapper,
                  flexDirection: userId === item.userId ? "row-reverse" : "row",
                }}
              >
                <Image
                  source={{ uri: item.avatar }}
                  style={{
                    ...styles.avatar,
                    marginRight: userId === item.userId ? 0 : 16,
                    marginLeft: userId === item.userId ? 16 : 0,
                  }}
                />
                <View style={styles.commentContainer}>
                  <Text style={styles.comment}>{item.comment}</Text>
                </View>
              </View>
            )}
          />

          <View>
            <TextInput
              style={styles.input}
              value={comment}
              placeholder={"Коментувати..."}
              placeholderTextColor={"#BDBDBD"}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) => setComment(value)}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.commentButton}
              onPress={sendComment}
            >
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
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  photo: {
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#F6F6F6",
    color: "#212121",
    borderColor: "#E8E8E8",
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    fontSize: 16,
    lineHeight: 19,
    paddingLeft: 16,
    paddingRight: 50,
  },
  commentButton: {
    backgroundColor: "#FF6C00",
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  wrapper: {
    alignItems: "center",
  },
  commentContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    width: 299,
    padding: 16,
    marginBottom: 24,
    borderRadius: 6,
  },
  avatar: {
    overflow: "hidden",
    resizeMode: "cover",
    height: 28,
    width: 28,
    borderRadius: 50,
  },
  comment: {
    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontSize: 13,
  },
});
