import { StyleSheet, Text, TextInput, View } from "react-native";

const AppInput = () => {
  return (
    <View>
      <View style={styles.inputBox}>
        <TextInput style={styles.input} />
      </View>
    </View>
  );
};
export default AppInput;

const styles = StyleSheet.create({
  inputBox: {},
  input: {},
});
