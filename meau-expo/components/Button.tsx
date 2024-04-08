import { Text } from "./Themed";
import {  StyleSheet, Pressable } from 'react-native';



export default function AdoptButton(props: { onPress : () => void , title: string}) {
    return (
    <Pressable style={styles.buttonContainer} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </Pressable>
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
        justifyContent: "center",
        marginBottom: 20
    },
    buttonText: {
        color: "#434343",
        fontSize: 12,
    },
});