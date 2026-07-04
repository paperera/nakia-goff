import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useRef } from "react";
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const FEATURED_SERVICES = [
  {
    id: "1",
    name: "Beginner's Braiding Course",
    tagline: "Featured",
    priceLabel: "$300+",
    duration: "3h 45m",
  },
  {
    id: "2",
    name: "Consultation",
    tagline: "Start Here",
    priceLabel: "$25+",
    duration: "15 min",
  },
  {
    id: "3",
    name: "Deep Conditioning & Trimmed",
    tagline: "Featured",
    priceLabel: "$100+",
    duration: "2h 45m",
  },
  {
    id: "4",
    name: "Shampoo & Blow Dry",
    tagline: "Quick Service",
    priceLabel: "$30+",
    duration: "45 min",
  },
];

const REVIEWS = [
  {
    id: "1",
    name: "Brandon G.",
    stars: 5,
    service: "Natural Cornrows",
    text: "The cornrows I got look amazing",
    date: "May 7, 2026",
    tags: ["Creative", "On Time", "Professional", "Responsive", "Thorough"],
  },
  {
    id: "2",
    name: "Tiara W.",
    stars: 5,
    service: "Loc Maintenance (Palm Roll Method)",
    text: "Amazing work/ love her work. She is awesome. Very very professional. Great energy and spirit. Work is always on point. The best Loctician/hairstylist in Charleston hands down. She will keep your locs healthy and will also give an honest assessment. She also did my daughter singles and my daughter was in love. Book her she is the truth.",
    date: "Mar 7, 2026",
    tags: ["Attentive", "Creative", "Listens", "On Time", "Personable", "Professional"],
  },
  {
    id: "3",
    name: "BONNIE W.",
    stars: 5,
    service: "Feedin Ponytail",
    text: "",
    date: "Feb 13, 2026",
    tags: ["Attentive", "Creative", "Meticulous", "On Time", "Professional"],
  },
  {
    id: "4",
    name: "Wolletta B.",
    stars: 5,
    service: "Crochet Braids",
    text: "Always on point and love my crochet styles",
    date: "Feb 5, 2026",
    tags: ["Attentive", "Creative", "On Time", "Personable", "Professional"],
  },
  {
    id: "5",
    name: "Anonymous",
    stars: 5,
    service: "Loc Maintenance (Palm Roll Method), Fishtail braid",
    text: "",
    date: "Nov 24, 2025",
    tags: ["Attentive", "Creative", "On Time", "Professional", "Thorough"],
  },
  {
    id: "6",
    name: "Claudia F.",
    stars: 5,
    service: "Bohemian (Boho) curls, Shampoo & blow dry, Fulani",
    text: "",
    date: "Nov 4, 2025",
    tags: ["On Time"],
  },
  {
    id: "7",
    name: "Sabrina T.",
    stars: 5,
    service: "Crochet Braids, Shampoo & blow dry",
    text: "",
    date: "Nov 3, 2025",
    tags: ["Attentive", "Creative", "Listens", "On Time", "Personable", "Professional"],
  },
  {
    id: "8",
    name: "Felicia H.",
    stars: 5,
    service: "Starter Loc",
    text: "Excellent work. Nikia was very patient and thorough with her work. She took the time to explain the process and how to manage the style. She is very thoughtful and helpful. I will definitely return for my next appointment.",
    date: "Oct 6, 2025",
    tags: ["Attentive", "Listens", "Personable", "Professional", "Thorough"],
  },
  {
    id: "9",
    name: "Kris J.",
    stars: 5,
    service: "Half of Head Loc Maintenance",
    text: "",
    date: "Sep 25, 2025",
    tags: ["Attentive", "Creative", "On Time", "Personable", "Professional"],
  },
  {
    id: "10",
    name: "Kristy G.",
    stars: 5,
    service: "Loc Maintenance (Palm Roll Method)",
    text: "Great service and is quick. Love my hair!",
    date: "Sep 21, 2025",
    tags: ["Listens", "On Time", "Professional"],
  },
  {
    id: "11",
    name: "Treeya B.",
    stars: 5,
    service: "Micro Locs Retie",
    text: "",
    date: "Sep 10, 2025",
    tags: ["Listens", "On Time", "Professional"],
  },
  {
    id: "12",
    name: "Katherine F.",
    stars: 5,
    service: "Shampoo & blow dry, Crochet Braids",
    text: "",
    date: "Aug 10, 2025",
    tags: ["Attentive", "Listens", "On Time", "Personable", "Professional", "Trendy"],
  },
  {
    id: "13",
    name: "Jordan P.",
    stars: 5,
    service: "Loc Maintenance (Palm Roll Method)",
    text: "",
    date: "Aug 9, 2025",
    tags: ["Attentive", "Meticulous", "Responsive", "Thorough"],
  },
  {
    id: "14",
    name: "Robin W.",
    stars: 5,
    service: "Bohemian (Boho) curls, Medium Knotless Braids",
    text: "",
    date: "Jul 18, 2025",
    tags: ["Attentive", "Listens", "On Time", "Personable", "Professional"],
  },
  {
    id: "15",
    name: "Latoya P.",
    stars: 5,
    service: "Bohemian (Boho) curls, Smedium Knotless",
    text: "",
    date: "Jul 14, 2025",
    tags: ["Professional"],
  },
  {
    id: "16",
    name: "Zaire R.",
    stars: 5,
    service: "Boho Knotless Braids",
    text: "Great Stylist! I cannot say enough great things about Nikia! She did my daughter's boho knotless braids and they turned out absolutely beautiful. Her attention to detail is amazing, and the final look exceeded our expectations. Beyond her talent, Nikia is so kind, patient, and professional. We will definitely be back! Highly recommend.",
    date: "Jun 30, 2025",
    tags: ["Listens", "On Time", "Personable", "Professional", "Responsive"],
  },
  {
    id: "17",
    name: "Glenda M.",
    stars: 5,
    service: "Feedin Ponytail",
    text: "",
    date: "May 28, 2025",
    tags: ["Creative", "Listens", "Personable", "Professional", "Responsive"],
  },
  {
    id: "18",
    name: "Cassandra U.",
    stars: 5,
    service: "Consultation",
    text: "",
    date: "May 8, 2025",
    tags: ["Creative", "Listens", "Personable", "Professional", "Responsive"],
  },
  {
    id: "19",
    name: "Stephannie H.",
    stars: 5,
    service: "Crochet Braids",
    text: "",
    date: "May 3, 2025",
    tags: ["On Time", "Personable", "Professional", "Thorough"],
  },
  {
    id: "20",
    name: "Jade T.",
    stars: 3,
    service: "8-12 Stitched Braids, Waist length",
    text: "Neat but tight. I liked my hair a lot, it was neat and tight but you braided up all my baby hairs that I specifically left out. Other than that everything was great.",
    date: "Apr 19, 2025",
    tags: ["Listens", "On Time"],
  },
];

const HOURS = [
  { day: "Monday", hours: "9:00 AM – 6:00 PM" },
  { day: "Tuesday", hours: "9:00 AM – 4:00 PM" },
  { day: "Wednesday", hours: "9:00 AM – 9:00 PM" },
  { day: "Thursday", hours: "9:00 AM – 9:00 PM" },
  { day: "Friday", hours: "9:00 AM – 4:00 PM" },
  { day: "Saturday", hours: "8:30 AM – 2:30 PM" },
  { day: "Sunday", hours: "Closed" },
];

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const isWeb = Platform.OS === "web";
  const topInset = isWeb ? 67 : insets.top;
  const bottomInset = isWeb ? 34 : insets.bottom;

  const heroHeight = 340;
  const headerOpacity = scrollY.interpolate({
    inputRange: [heroHeight - 80, heroHeight - 40],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Floating header */}
      <Animated.View
        style={[
          styles.floatingHeader,
          {
            paddingTop: topInset,
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
            opacity: headerOpacity,
          },
        ]}
      >
        <Text
          style={[
            styles.floatingHeaderTitle,
            { color: colors.foreground, fontFamily: "Inter_600SemiBold" },
          ]}
        >
          Klassy Handz
        </Text>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: Platform.OS !== "web" }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: bottomInset + 24 }}
      >
        {/* Hero */}
        <View style={{ height: heroHeight, position: "relative" }}>
          <Image
            source={require("../../assets/images/salon_bg.png")}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(20,13,16,0.88)"]}
            style={StyleSheet.absoluteFill}
          />
          <View
            style={[
              styles.heroContent,
              { paddingTop: topInset + 12, paddingBottom: 24 },
            ]}
          >
            <View style={styles.heroBadge}>
              <Image
                source={require("../../assets/images/stylist_portrait.png")}
                style={styles.avatar}
                contentFit="cover"
              />
              <View style={styles.onlineDot} />
            </View>
            <Text
              style={[styles.heroName, { fontFamily: "Inter_700Bold" }]}
            >
              Nikia Jones
            </Text>
            <Text
              style={[styles.heroBrand, { fontFamily: "Inter_600SemiBold" }]}
            >
              Klassy Handz
            </Text>
            <View style={styles.heroMeta}>
              <Ionicons
                name="location-outline"
                size={13}
                color="rgba(255,255,255,0.7)"
              />
              <Text
                style={[
                  styles.heroMetaText,
                  { fontFamily: "Inter_400Regular" },
                ]}
              >
                Charleston, SC
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View
          style={[
            styles.statsRow,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.stat}>
            <Text
              style={[
                styles.statValue,
                { color: colors.primary, fontFamily: "Inter_700Bold" },
              ]}
            >
              4.9
            </Text>
            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons key={i} name="star" size={11} color="#F59E0B" />
              ))}
            </View>
            <Text
              style={[
                styles.statLabel,
                {
                  color: colors.mutedForeground,
                  fontFamily: "Inter_400Regular",
                },
              ]}
            >
              Rating
            </Text>
          </View>
          <View
            style={[styles.statDivider, { backgroundColor: colors.border }]}
          />
          <View style={styles.stat}>
            <Text
              style={[
                styles.statValue,
                { color: colors.primary, fontFamily: "Inter_700Bold" },
              ]}
            >
              83
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  color: colors.mutedForeground,
                  fontFamily: "Inter_400Regular",
                },
              ]}
            >
              Reviews
            </Text>
          </View>
          <View
            style={[styles.statDivider, { backgroundColor: colors.border }]}
          />
          <View style={styles.stat}>
            <Text
              style={[
                styles.statValue,
                { color: colors.primary, fontFamily: "Inter_700Bold" },
              ]}
            >
              96%
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  color: colors.mutedForeground,
                  fontFamily: "Inter_400Regular",
                },
              ]}
            >
              5-star
            </Text>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionLabel,
              { color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
            ]}
          >
            ABOUT
          </Text>
          <Text
            style={[
              styles.bioText,
              { color: colors.foreground, fontFamily: "Inter_400Regular" },
            ]}
          >
            Welcome! I'm so glad you stopped by. I'm a dedicated professional
            passionate about helping clients feel confident, refreshed, and
            empowered. Whether you're here for a quick refresh or a full
            transformation, my goal is to provide high-quality, personalized
            care in a warm and welcoming space. Take a moment for yourself —
            you deserve it.
          </Text>
        </View>

        {/* Book CTA */}
        <View style={[styles.ctaSection, { paddingHorizontal: 20 }]}>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push("/(tabs)/book");
            }}
            style={({ pressed }) => [
              styles.ctaBtn,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Ionicons
              name="calendar-outline"
              size={18}
              color={colors.primaryForeground}
            />
            <Text
              style={[
                styles.ctaBtnText,
                {
                  color: colors.primaryForeground,
                  fontFamily: "Inter_700Bold",
                },
              ]}
            >
              Book Appointment
            </Text>
          </Pressable>
        </View>

        {/* Featured Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionLabel,
                {
                  color: colors.mutedForeground,
                  fontFamily: "Inter_500Medium",
                },
              ]}
            >
              FEATURED SERVICES
            </Text>
            <Pressable onPress={() => router.push("/(tabs)/services")}>
              <Text
                style={[
                  styles.seeAll,
                  { color: colors.primary, fontFamily: "Inter_500Medium" },
                ]}
              >
                See all
              </Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          >
            {FEATURED_SERVICES.map((svc) => (
              <Pressable
                key={svc.id}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push({
                    pathname: "/(tabs)/book",
                    params: {
                      serviceId: svc.id,
                      serviceName: svc.name,
                    },
                  });
                }}
                style={({ pressed }) => [
                  styles.featuredCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    opacity: pressed ? 0.9 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.featuredBadge,
                    { backgroundColor: colors.muted },
                  ]}
                >
                  <Text
                    style={[
                      styles.featuredBadgeText,
                      { color: colors.primary, fontFamily: "Inter_500Medium" },
                    ]}
                  >
                    {svc.tagline}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.featuredName,
                    {
                      color: colors.foreground,
                      fontFamily: "Inter_600SemiBold",
                    },
                  ]}
                >
                  {svc.name}
                </Text>
                <View style={styles.featuredMeta}>
                  <Ionicons
                    name="time-outline"
                    size={12}
                    color={colors.mutedForeground}
                  />
                  <Text
                    style={[
                      styles.featuredDuration,
                      {
                        color: colors.mutedForeground,
                        fontFamily: "Inter_400Regular",
                      },
                    ]}
                  >
                    {svc.duration}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.featuredPrice,
                    { color: colors.primary, fontFamily: "Inter_700Bold" },
                  ]}
                >
                  {svc.priceLabel}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Hours */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionLabel,
              { color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
            ]}
          >
            HOURS
          </Text>
          <View
            style={[
              styles.hoursCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            {HOURS.map((h, i) => {
              const today = new Date().toLocaleString("en-US", {
                weekday: "long",
              });
              const isToday = today === h.day;
              const isClosed = h.hours === "Closed";
              return (
                <View
                  key={h.day}
                  style={[
                    styles.hoursRow,
                    i < HOURS.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.hoursDay,
                      {
                        color: isToday ? colors.primary : colors.foreground,
                        fontFamily: isToday
                          ? "Inter_600SemiBold"
                          : "Inter_400Regular",
                      },
                    ]}
                  >
                    {h.day}
                  </Text>
                  <Text
                    style={[
                      styles.hoursTime,
                      {
                        color: isClosed
                          ? colors.mutedForeground
                          : isToday
                          ? colors.primary
                          : colors.foreground,
                        fontFamily: isToday
                          ? "Inter_600SemiBold"
                          : "Inter_400Regular",
                      },
                    ]}
                  >
                    {h.hours}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionLabel,
                {
                  color: colors.mutedForeground,
                  fontFamily: "Inter_500Medium",
                },
              ]}
            >
              REVIEWS
            </Text>
            <View style={styles.overallRating}>
              <Ionicons name="star" size={13} color="#F59E0B" />
              <Text
                style={[
                  styles.overallRatingText,
                  {
                    color: colors.foreground,
                    fontFamily: "Inter_600SemiBold",
                  },
                ]}
              >
                4.9 (83)
              </Text>
            </View>
          </View>
          <View style={styles.reviewsList}>
            {REVIEWS.map((review) => (
              <View
                key={review.id}
                style={[
                  styles.reviewCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.reviewHeader}>
                  <View
                    style={[
                      styles.reviewAvatar,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    <Text
                      style={[
                        styles.reviewAvatarLetter,
                        {
                          color: colors.primaryForeground,
                          fontFamily: "Inter_700Bold",
                        },
                      ]}
                    >
                      {review.name[0]}
                    </Text>
                  </View>
                  <View style={styles.reviewMeta}>
                    <Text
                      style={[
                        styles.reviewName,
                        {
                          color: colors.foreground,
                          fontFamily: "Inter_600SemiBold",
                        },
                      ]}
                    >
                      {review.name}
                    </Text>
                    <View style={styles.starRow}>
                      {Array.from({ length: review.stars }).map((_, i) => (
                        <Ionicons
                          key={i}
                          name="star"
                          size={11}
                          color="#F59E0B"
                        />
                      ))}
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.reviewDate,
                      {
                        color: colors.mutedForeground,
                        fontFamily: "Inter_400Regular",
                      },
                    ]}
                  >
                    {review.date}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.reviewService,
                    { color: colors.primary, fontFamily: "Inter_500Medium" },
                  ]}
                >
                  {review.service}
                </Text>
                <Text
                  style={[
                    styles.reviewText,
                    {
                      color: colors.foreground,
                      fontFamily: "Inter_400Regular",
                    },
                  ]}
                >
                  {review.text}
                </Text>
                <View style={styles.tagRow}>
                  {review.tags.map((tag) => (
                    <View
                      key={tag}
                      style={[
                        styles.tag,
                        { backgroundColor: colors.muted },
                      ]}
                    >
                      <Text
                        style={[
                          styles.tagText,
                          {
                            color: colors.mutedForeground,
                            fontFamily: "Inter_400Regular",
                          },
                        ]}
                      >
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  floatingHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  floatingHeaderTitle: {
    fontSize: 17,
    textAlign: "center",
  },
  heroContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
    paddingHorizontal: 20,
  },
  heroBadge: {
    position: "relative",
    marginBottom: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
  },
  onlineDot: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#22C55E",
    borderWidth: 2,
    borderColor: "#fff",
  },
  heroName: {
    fontSize: 26,
    color: "#fff",
  },
  heroBrand: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    letterSpacing: 0.5,
  },
  heroMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  heroMetaText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: -1,
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  stat: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  statValue: {
    fontSize: 22,
  },
  starRow: {
    flexDirection: "row",
    gap: 1,
  },
  statLabel: {
    fontSize: 11,
  },
  statDivider: {
    width: 1,
    height: 36,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1.2,
  },
  seeAll: {
    fontSize: 13,
  },
  overallRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  overallRatingText: {
    fontSize: 13,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 22,
  },
  ctaSection: {
    marginTop: 20,
  },
  ctaBtn: {
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  ctaBtnText: {
    fontSize: 16,
  },
  featuredList: {
    gap: 12,
  },
  featuredCard: {
    width: 160,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 8,
  },
  featuredBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  featuredBadgeText: {
    fontSize: 10,
    letterSpacing: 0.3,
  },
  featuredName: {
    fontSize: 14,
    lineHeight: 18,
  },
  featuredMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  featuredDuration: {
    fontSize: 12,
  },
  featuredPrice: {
    fontSize: 16,
  },
  hoursCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  hoursRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  hoursDay: {
    fontSize: 14,
  },
  hoursTime: {
    fontSize: 14,
  },
  reviewsList: {
    gap: 12,
  },
  reviewCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 8,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewAvatarLetter: {
    fontSize: 15,
  },
  reviewMeta: {
    flex: 1,
    gap: 3,
  },
  reviewName: {
    fontSize: 14,
  },
  reviewDate: {
    fontSize: 12,
    marginTop: 2,
  },
  reviewService: {
    fontSize: 12,
  },
  reviewText: {
    fontSize: 13,
    lineHeight: 20,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 11,
  },
});
