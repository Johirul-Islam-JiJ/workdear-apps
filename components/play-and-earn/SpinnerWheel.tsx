import { useThemeColor } from "@/hooks/useThemeColor";
import {
  useCheckSpinQuery,
  usePlayAndEarnMutation,
} from "@/store/features/playAndEarn";
import { updateUserBalance } from "@/store/slices/user";
import { Image } from "expo-image";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";
import { scheduleOnRN } from "react-native-worklets";
import { useDispatch } from "react-redux";
import LoadingIndicator from "../libs/LoadingIndicator";
import { ThemedText } from "../libs/ThemedText";

const { width } = Dimensions.get("window");
const wheelSize = width * 0.8;
const radius = wheelSize / 2 - 20;
const centerX = wheelSize / 2;
const centerY = wheelSize / 2;
const buttonSize = wheelSize * 0.25;
const pointerSize = wheelSize * 0.24;

const rewardData = [
  { option: "0.0001" },
  { option: "0.0002" },
  { option: "0.0003" },
  { option: "0.0004" },
  { option: "0.0001" },
  { option: "0.0002" },
  { option: "0.0003" },
  { option: "0.0001" },
];

const colors = [
  "#E91E63",
  "#2196F3",
  "#FF9800",
  "#00BCD4",
  "#4CAF50",
  "#9C27B0",
  "#FFC107",
  "#3F51B5",
];

interface SpinResponse {
  reward: string;
}

export default function SpinnerWheel() {
  const [result, setResult] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const rotation = useSharedValue(0);
  const primaryColor = useThemeColor("primarydark");
  const disabledColor = useThemeColor("gray.600");
  const [playAndEarn, { isLoading }] = usePlayAndEarnMutation();
  const { data, isLoading: isChecking, refetch } = useCheckSpinQuery(undefined);
  const dispatch = useDispatch();

  const updateAfterSpin = useCallback(
    (reward: string) => {
      setSpinning(false);
      setResult(reward);
      dispatch(updateUserBalance(reward));
      Alert.alert("Success", `Congratulations! You got ${reward}$`);
      refetch();
    },
    [dispatch, refetch]
  );

  const segmentCount = rewardData.length;
  const anglePerSegment = 360 / segmentCount;

  const createSegmentPath = (index: number): string => {
    const startAngle = (index * anglePerSegment - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * anglePerSegment - 90) * (Math.PI / 180);

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArcFlag = anglePerSegment > 180 ? 1 : 0;

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (index: number) => {
    const angle =
      (index * anglePerSegment + anglePerSegment / 2 - 90) * (Math.PI / 180);
    const textRadius = radius * 0.6;
    const x = centerX + textRadius * Math.cos(angle);
    const y = centerY + textRadius * Math.sin(angle);
    const textRotation = index * anglePerSegment + anglePerSegment / 2 + 270;

    return { x, y, rotation: textRotation };
  };

  const handleSpin = async () => {
    if (spinning) return;

    try {
      const response = (await playAndEarn(undefined).unwrap()) as SpinResponse;
      const targetIndex = rewardData.findIndex(
        (r) => r.option === response.reward
      );
      if (targetIndex === -1) {
        Alert.alert("Error", "Reward not found in wheel!");
        return;
      }

      setSpinning(true);
      setResult(null);

      const spins = 5;
      const stopAngle =
        spins * 360 + (segmentCount - targetIndex) * (anglePerSegment + 1);

      rotation.value = withTiming(
        rotation.value + stopAngle,
        {
          duration: 4000,
          easing: Easing.out(Easing.ease),
        },
        () => {
          "worklet";
          scheduleOnRN(updateAfterSpin, response.reward);
        }
      );
    } catch (error: any) {
      setSpinning(false);
      Alert.alert(
        "Error",
        error.data?.message || error.message || "Spin failed!"
      );
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const canSpin = !spinning && !isLoading && !data?.data?.id && !isChecking;

  const buttonPosition = (wheelSize - buttonSize) / 2;

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/map-pointer.png")}
        style={styles.pointer}
      />
      <View
        style={[styles.wheelContainer, { width: wheelSize, height: wheelSize }]}
      >
        <Animated.View style={[styles.svgContainer, animatedStyle]}>
          <Svg width={wheelSize} height={wheelSize}>
            {rewardData.map((seg, index) => {
              const textPos = getTextPosition(index);
              return (
                <G key={index}>
                  <Path
                    d={createSegmentPath(index)}
                    fill={colors[index]}
                    stroke="none"
                  />
                  <SvgText
                    x={textPos.x}
                    y={textPos.y}
                    fill="white"
                    fontSize={wheelSize * 0.04}
                    fontWeight="bold"
                    textAnchor="middle"
                    transform={`rotate(${textPos.rotation - 360} ${textPos.x} ${
                      textPos.y
                    })`}
                  >
                    {seg.option}
                  </SvgText>
                </G>
              );
            })}
          </Svg>
        </Animated.View>

        <TouchableOpacity
          onPress={handleSpin}
          disabled={!canSpin}
          style={[
            styles.spinButton,
            {
              width: buttonSize,
              height: buttonSize,
              borderRadius: buttonSize / 2,
              backgroundColor: canSpin ? primaryColor : disabledColor,
              top: buttonPosition,
              left: buttonPosition,
            },
          ]}
          activeOpacity={0.7}
        >
          <ThemedText variant="button" color="white">
            Spin
          </ThemedText>
        </TouchableOpacity>
      </View>

      {result && (
        <ThemedText variant="body2" color="success">
          You won: {result}
        </ThemedText>
      )}

      {isChecking && <LoadingIndicator />}

      {data?.data?.id && (
        <ThemedText style={{ textAlign: "center" }} variant="button">
          You have played this round today. Wait for next day.
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  wheelContainer: {
    borderRadius: wheelSize / 2,
    borderWidth: 0,
    overflow: "hidden",
  },
  pointer: {
    height: 70,
    width: 70,
    position: "absolute",
    top: -10,
    right: 80,
    zIndex: 1,
    transform: [{ rotate: "30deg" }],
  },

  svgContainer: {
    width: wheelSize,
    height: wheelSize,
    borderRadius: wheelSize / 2,
  },
  spinButton: {
    position: "absolute",
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
