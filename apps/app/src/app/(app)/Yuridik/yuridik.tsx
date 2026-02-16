import { StyleSheet, Text, View } from "react-native";
import PageHeader from "src/components/header/PageHeader";
import { Colors } from "src/shared/token";

export const Yuridik = () => {
  return (
    <View style={{ flex: 1 }}>
      <PageHeader title="Yuridik" />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: Colors.textPrimary }}>yuridik</Text>
      </View>
    </View>
  );
};

export default Yuridik;

const styles = StyleSheet.create({});
