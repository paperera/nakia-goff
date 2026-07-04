import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

export default function BookingConfirmationScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    service: string;
    price: string;
    duration: string;
    date: string;
    time: string;
    name: string;
  }>();

  const isWeb = Platform.OS === "web";
  const bottomInset = isWeb ? 34 : insets.bottom;

  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);
  const slideUp = useSharedValue(40);

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
    opacity.value = withTiming(1, { duration: 400 });
    slideUp.value = withDelay(200, withSpring(0, { damping: 16, stiffness: 180 }));
  }, []);

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: slideUp.value }],
    opacity: opacity.value,
  }));

  const formattedDate = params.date
    ? new Date(params.date + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : params.date;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={[colors.primary, colors.accent]}
        style={styles.topGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={[styles.checkCircle, checkStyle]}>
          <Ionicons name="checkmark" size={48} color="#fff" />
        </Animated.View>
        <Text style={[styles.confirmedLabel, { fontFamily: "Inter_700Bold" }]}>
          You're booked!
        </Text>
        <Text style={[styles.confirmedSub, { fontFamily: "Inter_400Regular" }]}>
          We'll see you soon, {params.name?.split(" ")[0]}
        </Text>
      </LinearGradient>

      <Animated.View style={[styles.detailCard, { backgroundColor: colors.card, borderColor: colors.border }, cardStyle]}>
        <Text style={[styles.detailTitle, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>
          APPOINTMENT DETAILS
        </Text>

        <View style={[styles.detailRow, { borderBottomColor: colors.border }]}>
          <View style={styles.detailIcon}>
            <Ionicons name="cut-outline" size={18} color={colors.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={[styles.detailKey, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Service
            </Text>
            <Text style={[styles.detailValue, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
              {params.service}
            </Text>
          </View>
        </View>

        <View style={[styles.detailRow, { borderBottomColor: colors.border }]}>
          <View style={styles.detailIcon}>
            <Ionicons name="calendar-outline" size={18} color={colors.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={[styles.detailKey, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Date & Time
            </Text>
            <Text style={[styles.detailValue, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
              {formattedDate}
            </Text>
            <Text style={[styles.detailSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              {params.time}
            </Text>
          </View>
        </View>

        <View style={[styles.detailRow, { borderBottomColor: colors.border }]}>
          <View style={styles.detailIcon}>
            <Ionicons name="time-outline" size={18} color={colors.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={[styles.detailKey, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Duration
            </Text>
            <Text style={[styles.detailValue, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
              {params.duration}
            </Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailIcon}>
            <Ionicons name="cash-outline" size={18} color={colors.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={[styles.detailKey, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Total
            </Text>
            <Text style={[styles.detailValue, { color: colors.primary, fontFamily: "Inter_700Bold" }]}>
              ${params.price}
            </Text>
          </View>
        </View>
      </Animated.View>

      <View style={[styles.locationCard, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
        <Ionicons name="location-outline" size={18} color={colors.primary} />
        <View style={styles.locationText}>
          <Text style={[styles.locationName, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
            Nikia Jones Beauty
          </Text>
          <Text style={[styles.locationAddr, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            Atlanta, GA
          </Text>
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: bottomInset + 16 }]}>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.replace("/(tabs)/");
          }}
          style={({ pressed }) => [
            styles.doneBtn,
            { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Text style={[styles.doneBtnText, { color: colors.primaryForeground, fontFamily: "Inter_700Bold" }]}>
            Done
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topGradient: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 48,
    gap: 12,
  },
  checkCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmedLabel: {
    fontSize: 28,
    color: "#fff",
  },
  confirmedSub: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },
  detailCard: {
    margin: 20,
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  detailTitle: {
    fontSize: 11,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 14,
    gap: 14,
    borderBottomWidth: 1,
  },
  detailIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  detailContent: {
    flex: 1,
    gap: 2,
  },
  detailKey: {
    fontSize: 12,
  },
  detailValue: {
    fontSize: 15,
  },
  detailSub: {
    fontSize: 13,
  },
  locationCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  locationText: {
    flex: 1,
    gap: 2,
  },
  locationName: {
    fontSize: 14,
  },
  locationAddr: {
    fontSize: 13,
  },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  doneBtn: {
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  doneBtnText: {
    fontSize: 16,
  },
});
