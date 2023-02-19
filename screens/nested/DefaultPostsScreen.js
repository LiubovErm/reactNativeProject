import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
  
      <TouchableOpacity
        style={styles.userContainer}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Profile")}
      >
        <View style={styles.avatarContainer}>
          <ImageBackground
            style={styles.avatar}
            source={require("../../assets/img/fox.jpg")}
          ></ImageBackground>
        </View>

        <View style={styles.userInformationContainer}>
          <Text style={styles.userName}>Liubov Yermakova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </TouchableOpacity>

      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.postsContainer}>
              <Image
                style={styles.postPhoto}
                source={{ uri: item.post.photo }}
              />
              <Text style={styles.postTitle}>{item.post.title}</Text>
         
            <View style={styles.postInformationContainer}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ ...styles.postComments, marginRight: 25 }}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("Comments", {
                    uri: item.post.photo,
                  })}
                >
                  <FontAwesome name="comment-o" size={24} color="#BDBDBD" />
                  <Text style={styles.numberComments}>0</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.postLocation}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("Map", {
                    coords: {
                      latitude: item.post.location.coords.latitude,
                      longitude: item.post.location.coords.longitude,
                    },
                    place: item.post.place,
                  })
                }
              >
                <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD"/>
                <Text
                  style={styles.locationText}
                >
                  {item.post.place}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  avatarContainer: {
    overflow: "hidden", 
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  avatar: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
  userInformationContainer: {
    marginLeft: 8,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    color: "#212121",
    fontSize: 13,
    lineHeight: 15
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    color: "rgba(33, 33, 33, 0.8)",
    fontSize: 11,
    lineHeight: 13
  },
  postsContainer: {
    marginHorizontal: 16,
  },
  postPhoto: {
    resizeMode: "cover",
    height: 240,
    borderRadius: 8
  },
  postTitle: {
    fontFamily: "Roboto-Medium",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    marginVertical: 8
  },
  postInformationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 34,
  },
  postComments: {
    flexDirection: "row",
    alignItems: "center",
  },
  numberComments: {
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 9
  },
  postLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
    textDecorationLine: "underline",
  },
});
