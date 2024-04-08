import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, StyleProp } from "react-native";

interface ButtonProps {
  onPress?: () => void;
  onLongPress?: () => void;
  title: string;
  iconLeft?: React.ReactNode; // Can be any JSX element
  iconRight?: React.ReactNode; // Can be any JSX element
  style?: StyleProp<TouchableOpacity> | any;
  textStyle?: StyleProp<Text> |any;
  disabled?: boolean;
  activeOpacity?: number;
  loading?: boolean;
}

const SharedButton: React.FC<ButtonProps> = ({
  onPress,
  onLongPress,
  title,
  style,
  textStyle,
  disabled,
  activeOpacity,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={[disabled ? styles.disabledButton : styles.buttonContainer, style]}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#ffd358",
        padding: 15,
        borderRadius: 5,
        width: 232,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: "#434343",
        fontSize: 12,
    },
   disabledButton: {
    backgroundColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  
});

export default SharedButton;
