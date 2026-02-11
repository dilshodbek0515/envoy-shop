import ArrowIcon from "assets/icon/arrowIcon";
import ArrowTopIcon from "assets/icon/arrowTop";
import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
  Animated,
  TextStyle,
} from "react-native";
import { Spacing } from "src/shared/token";

const DATA = [
  "YaTT",
  "Fermer xo‘jaligi",
  "Dehqon xo‘jaligi",
  "Shirkat xo‘jaligi",
  "MCHJ",
  "Xususiy korxona",
  "Unitar korxona",
  "Qo‘shma korxona",
  "Oilaviy korxona",
  "Boshqa",
];

const PRIMARY = "#00beff";
const GRAY = "#999999";
const INPUT_HEIGHT = 56;

const CompanySelect = ({ label = "Faoliyat turi", value, onSelect }: any) => {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const animated = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: focused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [focused, value]);

  const labelStyle: Animated.AnimatedProps<TextStyle> = {
    position: "absolute",
    zIndex: 2,
    elevation: 2,
    backgroundColor: "#171C26",
    paddingHorizontal: 4,
    borderRadius: 5,
    color: focused ? PRIMARY : GRAY,
    fontSize: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    transform: [
      {
        translateY: animated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -INPUT_HEIGHT / 2],
        }),
      },
    ],
  };

  return (
    <>
      {/* INPUT */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setFocused(true);
          setVisible(true);
        }}
        style={[styles.input, { borderColor: focused ? PRIMARY : GRAY }]}
      >
        <View style={styles.inputContent}>
          <Animated.Text style={labelStyle}>{label}</Animated.Text>
          <Text style={[styles.value, !value && { color: GRAY }]}>
            {value || ""}
          </Text>
        </View>
        {focused ? <ArrowTopIcon /> : <ArrowIcon />}
      </TouchableOpacity>

      {/* BOTTOM SHEET */}
      <Modal
        transparent
        animationType="slide"
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
          setFocused(false);
        }}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => {
            setVisible(false);
            setFocused(false);
          }}
        />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <FlatList
            data={DATA}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onSelect(item);
                  setVisible(false);
                  setFocused(false);
                }}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  );
};

export default CompanySelect;

const styles = StyleSheet.create({
  input: {
    height: INPUT_HEIGHT,
    borderWidth: 1.5,
    borderColor: GRAY,
    borderRadius: 20,
    paddingHorizontal: Spacing.horizontal,
    flexDirection: "row",
    alignItems: "center",
  },
  inputContent: {
    flex: 1,
    justifyContent: "center",
  },
  value: {
    fontSize: 16,
    color: "white",
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.64)",
  },
  sheet: {
    backgroundColor: "#262E3D",
    paddingTop: 10,
    paddingBottom: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    maxHeight: "55%",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 10,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 16,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  itemText: {
    color: "white",
    fontSize: 16,
  },
});
