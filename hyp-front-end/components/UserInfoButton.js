import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function UserInfoButton(props) {
  return (
    <TouchableOpacity
      style={styles.followersButton}
      onPress={props.handleClick}
    >
      <View style={styles.followText}>
        <Text style={styles.followText}>{props.title}</Text>
      </View>
      <View style={styles.followNumbers}>
        <Text style={styles.followNumbers}>{props.quantity}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  followText: {
    alignItems: "center",
    fontWeight: "300",
  },
  followNumbers: {
    alignItems: "center",
    fontWeight: "600",
  },
  followersButton: {
    flex: 3,
  },
});
