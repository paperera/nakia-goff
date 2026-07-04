import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { ALL_SERVICES } from "./services";

// Hours: Mon 9-6, Tue 9-4, Wed 9-9, Thu 9-9, Fri 9-4, Sat 8:30-2:30, Sun closed
const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM",
];

function generateDates() {
  const dates: {
    dateStr: string;
    dayName: string;
    dayNum: number;
    month: string;
    dayOfWeek: number;
  }[] = [];
  const now = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  for (let i = 1; i <= 30; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const dow = d.getDay();
    if (dow === 0) continue; // closed Sundays
    dates.push({
      dateStr: d.toISOString().split("T")[0],
      dayName: dayNames[dow],
      dayNum: d.getDate(),
      month: monthNames[d.getMonth()],
      dayOfWeek: dow,
    });
  }
  return dates;
}

const DATES = generateDates();

export default function BookScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    serviceId?: string;
    serviceName?: string;
    servicePrice?: string;
    serviceDuration?: string;
  }>();

  const isWeb = Platform.OS === "web";
  const topInset = isWeb ? 67 : insets.top;
  const bottomInset = isWeb ? 34 : insets.bottom;

  const preselected = params.serviceId
    ? ALL_SERVICES.find((s) => s.id === params.serviceId) ?? null
    : null;

  const [selectedService, setSelectedService] = useState(
    preselected ?? ALL_SERVICES[0]
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const canBook =
    !!selectedService &&
    !!selectedDate &&
    !!selectedTime &&
    name.trim().length > 0;

  const handleBook = async () => {
    if (!canBook) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLoading(true);
    const booking = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      service: selectedService.name,
      price: selectedService.price,
      priceLabel: selectedService.priceLabel,
      duration: selectedService.duration,
      date: selectedDate,
      time: selectedTime,
      name: name.trim(),
      phone: phone.trim(),
      bookedAt: new Date().toISOString(),
    };
    try {
      const existing = await AsyncStorage.getItem("bookings");
      const bookings = existing ? JSON.parse(existing) : [];
      bookings.push(booking);
      await AsyncStorage.setItem("bookings", JSON.stringify(bookings));
    } catch (_) {}
    setLoading(false);
    router.push({
      pathname: "/booking-confirmation",
      params: {
        service: booking.service,
        price: String(booking.price),
        priceLabel: booking.priceLabel,
        duration: booking.duration,
        date: booking.date ?? "",
        time: booking.time ?? "",
        name: booking.name,
      },
    });
  };

  const selectedDateObj = DATES.find((d) => d.dateStr === selectedDate);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          {
            paddingTop: topInset + 12,
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            { color: colors.foreground, fontFamily: "Inter_700Bold" },
          ]}
        >
          Book Appointment
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: bottomInset + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Service */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionLabel,
              { color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
            ]}
          >
            SERVICE
          </Text>
          <FlatList
            horizontal
            data={ALL_SERVICES}
            keyExtractor={(s) => s.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.serviceScroll}
            renderItem={({ item }) => {
              const isSelected = selectedService?.id === item.id;
              return (
                <Pressable
                  onPress={() => {
                    Haptics.selectionAsync();
                    setSelectedService(item);
                  }}
                  style={[
                    styles.serviceChip,
                    {
                      backgroundColor: isSelected
                        ? colors.primary
                        : colors.card,
                      borderColor: isSelected ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.serviceChipName,
                      {
                        color: isSelected
                          ? colors.primaryForeground
                          : colors.foreground,
                        fontFamily: "Inter_500Medium",
                      },
                    ]}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[
                      styles.serviceChipPrice,
                      {
                        color: isSelected
                          ? colors.primaryForeground
                          : colors.primary,
                        fontFamily: "Inter_700Bold",
                      },
                    ]}
                  >
                    {item.priceLabel}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>

        {/* Date */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionLabel,
              { color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
            ]}
          >
            DATE
          </Text>
          <FlatList
            horizontal
            data={DATES}
            keyExtractor={(d) => d.dateStr}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateScroll}
            renderItem={({ item }) => {
              const isSelected = selectedDate === item.dateStr;
              return (
                <Pressable
                  onPress={() => {
                    Haptics.selectionAsync();
                    setSelectedDate(item.dateStr);
                    setSelectedTime(null);
                  }}
                  style={[
                    styles.dateChip,
                    {
                      backgroundColor: isSelected
                        ? colors.primary
                        : colors.card,
                      borderColor: isSelected ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dateDayName,
                      {
                        color: isSelected
                          ? colors.primaryForeground
                          : colors.mutedForeground,
                        fontFamily: "Inter_400Regular",
                      },
                    ]}
                  >
                    {item.dayName}
                  </Text>
                  <Text
                    style={[
                      styles.dateDayNum,
                      {
                        color: isSelected
                          ? colors.primaryForeground
                          : colors.foreground,
                        fontFamily: "Inter_700Bold",
                      },
                    ]}
                  >
                    {item.dayNum}
                  </Text>
                  <Text
                    style={[
                      styles.dateMonth,
                      {
                        color: isSelected
                          ? colors.primaryForeground
                          : colors.mutedForeground,
                        fontFamily: "Inter_400Regular",
                      },
                    ]}
                  >
                    {item.month}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>

        {/* Time */}
        {selectedDate && (
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionLabel,
                {
                  color: colors.mutedForeground,
                  fontFamily: "Inter_500Medium",
                },
              ]}
            >
              TIME
            </Text>
            <View style={styles.timeGrid}>
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedTime === slot;
                return (
                  <Pressable
                    key={slot}
                    onPress={() => {
                      Haptics.selectionAsync();
                      setSelectedTime(slot);
                    }}
                    style={[
                      styles.timeChip,
                      {
                        backgroundColor: isSelected
                          ? colors.primary
                          : colors.card,
                        borderColor: isSelected
                          ? colors.primary
                          : colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.timeText,
                        {
                          color: isSelected
                            ? colors.primaryForeground
                            : colors.foreground,
                          fontFamily: "Inter_500Medium",
                        },
                      ]}
                    >
                      {slot}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {/* Contact */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionLabel,
              { color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
            ]}
          >
            YOUR DETAILS
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                color: colors.foreground,
                fontFamily: "Inter_400Regular",
              },
            ]}
            placeholder="Full name"
            placeholderTextColor={colors.mutedForeground}
            value={name}
            onChangeText={setName}
            autoCorrect={false}
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                color: colors.foreground,
                fontFamily: "Inter_400Regular",
                marginTop: 10,
              },
            ]}
            placeholder="Phone number (optional)"
            placeholderTextColor={colors.mutedForeground}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        {/* Summary */}
        {selectedService && selectedDate && selectedTime && (
          <View
            style={[
              styles.summaryCard,
              {
                backgroundColor: colors.secondary,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.summaryTitle,
                { color: colors.primary, fontFamily: "Inter_600SemiBold" },
              ]}
            >
              Booking Summary
            </Text>
            <View style={styles.summaryRow}>
              <Ionicons
                name="cut-outline"
                size={14}
                color={colors.mutedForeground}
              />
              <Text
                style={[
                  styles.summaryText,
                  { color: colors.foreground, fontFamily: "Inter_400Regular" },
                ]}
              >
                {selectedService.name}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Ionicons
                name="calendar-outline"
                size={14}
                color={colors.mutedForeground}
              />
              <Text
                style={[
                  styles.summaryText,
                  { color: colors.foreground, fontFamily: "Inter_400Regular" },
                ]}
              >
                {selectedDateObj?.dayName} {selectedDateObj?.dayNum}{" "}
                {selectedDateObj?.month} at {selectedTime}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Ionicons
                name="time-outline"
                size={14}
                color={colors.mutedForeground}
              />
              <Text
                style={[
                  styles.summaryText,
                  { color: colors.foreground, fontFamily: "Inter_400Regular" },
                ]}
              >
                {selectedService.duration}
              </Text>
            </View>
            <View
              style={[styles.summaryDivider, { backgroundColor: colors.border }]}
            />
            <View style={styles.summaryRow}>
              <Ionicons name="cash-outline" size={14} color={colors.primary} />
              <Text
                style={[
                  styles.summaryTotal,
                  { color: colors.primary, fontFamily: "Inter_700Bold" },
                ]}
              >
                Starting at {selectedService.priceLabel}
              </Text>
            </View>
          </View>
        )}

        {/* CTA */}
        <Pressable
          onPress={handleBook}
          disabled={!canBook || loading}
          style={({ pressed }) => [
            styles.ctaBtn,
            {
              backgroundColor: canBook ? colors.primary : colors.muted,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <Text
            style={[
              styles.ctaBtnText,
              {
                color: canBook
                  ? colors.primaryForeground
                  : colors.mutedForeground,
                fontFamily: "Inter_700Bold",
              },
            ]}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
  },
  scroll: {
    padding: 20,
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1.2,
  },
  serviceScroll: {
    gap: 10,
  },
  serviceChip: {
    width: 148,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    gap: 6,
  },
  serviceChipName: {
    fontSize: 13,
    lineHeight: 17,
  },
  serviceChipPrice: {
    fontSize: 16,
  },
  dateScroll: {
    gap: 8,
  },
  dateChip: {
    width: 58,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
    gap: 2,
  },
  dateDayName: {
    fontSize: 11,
  },
  dateDayNum: {
    fontSize: 20,
  },
  dateMonth: {
    fontSize: 10,
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  timeChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
  },
  timeText: {
    fontSize: 13,
  },
  input: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  summaryCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  summaryTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  summaryText: {
    fontSize: 13,
    flex: 1,
  },
  summaryDivider: {
    height: 1,
    marginVertical: 4,
  },
  summaryTotal: {
    fontSize: 15,
    flex: 1,
  },
  ctaBtn: {
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaBtnText: {
    fontSize: 16,
  },
});
