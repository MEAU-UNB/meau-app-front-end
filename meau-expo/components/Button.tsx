import { Text, View } from "./Themed";
import { StyleSheet } from 'react-native';

export default function AdoptButton(props: { title: string}) {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </View>
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
        marginBottom: 20,
    },
    buttonText: {
        color: "#434343",
        fontSize: 12,
    },
});