import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

export interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  priceLabel: string;
  category: string;
  description: string;
}

export const ALL_SERVICES: Service[] = [
  // Featured Services (4)
  {
    id: "f1",
    name: "Beginner's Braiding Course",
    duration: "3 hr 45 min",
    price: 300,
    priceLabel: "$300+",
    category: "Featured",
    description:
      "In this course, you will learn the basic needs to braid natural hair in 3 strands method. Includes Braiding kits, lunch, hands on training, & lifetime mentorship. Classes held on Sundays.",
  },
  {
    id: "f2",
    name: "Consultation",
    duration: "15 min",
    price: 25,
    priceLabel: "$25+",
    category: "Featured",
    description:
      "Booking a consultation is important when starting locs, micro locs, dealing with hair loss, or has a scalp condition etc. This service is in person.",
  },
  {
    id: "f3",
    name: "Deep Conditioning Treatment & Trimmed",
    duration: "2 hr 45 min",
    price: 100,
    priceLabel: "$100+",
    category: "Featured",
    description:
      "Restore moisture and health to your hair with a professional deep conditioning treatment plus a trim to remove split ends.",
  },
  {
    id: "f4",
    name: "Shampoo & Blow Dry",
    duration: "45 min",
    price: 30,
    priceLabel: "$30+",
    category: "Featured",
    description: "Professional shampoo and blow dry service.",
  },

  // Kidz Ages 6-11 (6)
  {
    id: "k1",
    name: "Feedin Ponytail",
    duration: "4 hr",
    price: 140,
    priceLabel: "$140+",
    category: "Kidz (6-11)",
    description:
      "Treat your little one to a new style. Braiding hair Color 1B only Medium feedin ponytail.",
  },
  {
    id: "k2",
    name: "Fulani",
    duration: "7 hr",
    price: 175,
    priceLabel: "$175+",
    category: "Kidz (6-11)",
    description:
      "This services consist of knotless in the back & either stitch or feedin on top.",
  },
  {
    id: "k3",
    name: "Kids Braidz with Extensions",
    duration: "6 hr",
    price: 165,
    priceLabel: "$165+",
    category: "Kidz (6-11)",
    description:
      "Braids for the little ones in your life. Kiddie braids with extensions with beads or curls. Only Color 1B provided. Please come with hair shampooed, blown dried, free of products, & detangled. Size medium to large.",
  },
  {
    id: "k4",
    name: "Kids Loc Maintenance",
    duration: "1 hr 45 min",
    price: 85,
    priceLabel: "$85+",
    category: "Kidz (6-11)",
    description:
      "Keep your locs going strong with a maintenance session. We'll shampoo, moisturize, incorporate new growth, and retwist any stray locs. $20 extra for 2 strands.",
  },
  {
    id: "k5",
    name: "Lemonade Braids",
    duration: "6 hr",
    price: 140,
    priceLabel: "$140+",
    category: "Kidz (6-11)",
    description: "Hair color 1B included.",
  },
  {
    id: "k6",
    name: "Natural Braids & Beads",
    duration: "3 hr 30 min",
    price: 90,
    priceLabel: "$90+",
    category: "Kidz (6-11)",
    description:
      "Aged 3-6. Quick braid styles. Braids for the little ones in your life.",
  },

  // Braidz Ages 12+ (15)
  {
    id: "b1",
    name: "4-6 Stitched Braids",
    duration: "2 hr 45 min",
    price: 140,
    priceLabel: "$140+",
    category: "Braidz (12+)",
    description:
      "Braiding hair provided color 1B only. Hair must be shampooed, blow dried, & free of products.",
  },
  {
    id: "b2",
    name: "8-12 Stitched Braids",
    duration: "5 hr",
    price: 165,
    priceLabel: "$165+",
    category: "Braidz (12+)",
    description:
      "Braiding hair provided color 1B only. Hair must be shampooed, blow dried, & free of products.",
  },
  {
    id: "b3",
    name: "Braid Down",
    duration: "2 hr 15 min",
    price: 65,
    priceLabel: "$65+",
    category: "Braidz (12+)",
    description:
      "This service consists of a shampoo, blow dry, & 5-6 straight back braids. Great for wig installs or anyone who wears wigs regularly.",
  },
  {
    id: "b4",
    name: "Crochet Braids",
    duration: "2 hr 30 min",
    price: 100,
    priceLabel: "$100+",
    category: "Braidz (12+)",
    description:
      "Stylish and protective. We'll attach extensions through your natural hair for a full-bodied look. Preferably 10-12 packs. HAIR NOT PROVIDED.",
  },
  {
    id: "b5",
    name: "Feedin Ponytail",
    duration: "3 hr",
    price: 150,
    priceLabel: "$150+",
    category: "Braidz (12+)",
    description: "Braiding hair included color 1B only.",
  },
  {
    id: "b6",
    name: "Fulani Braids",
    duration: "8 hr",
    price: 240,
    priceLabel: "$240+",
    category: "Braidz (12+)",
    description:
      "Protective and trendy braid style. Parts sections of hair in boxes for a tiled pattern part and even braids. Braiding hair color 1B only included.",
  },
  {
    id: "b7",
    name: "Fulani/Knotless Braids Touch Up",
    duration: "2 hr 45 min",
    price: 80,
    priceLabel: "$80+",
    category: "Braidz (12+)",
    description: "Touch up service for existing Fulani or Knotless braids.",
  },
  {
    id: "b8",
    name: "Invisible Locs",
    duration: "7 hr",
    price: 245,
    priceLabel: "$245+",
    category: "Braidz (12+)",
    description:
      "HAIR NOT PROVIDED. You will need 5 packs of Cuban Twist.",
  },
  {
    id: "b9",
    name: "Large/Jumbo Knotless Braids",
    duration: "4 hr",
    price: 165,
    priceLabel: "$165+",
    category: "Braidz (12+)",
    description:
      "Braiding hair color 1B only included. Hair & scalp must be shampooed & blow dried thoroughly, or can be an added-on service.",
  },
  {
    id: "b10",
    name: "Medium Knotless Braids",
    duration: "8 hr",
    price: 240,
    priceLabel: "$240+",
    category: "Braidz (12+)",
    description: "Hair color 1B included.",
  },
  {
    id: "b11",
    name: "Men Flat Twists",
    duration: "4 hr",
    price: 125,
    priceLabel: "$125+",
    category: "Braidz (12+)",
    description:
      "Protect and style natural hair with cornrow-like braids. Shampoo is included.",
  },
  {
    id: "b12",
    name: "Natural Cornrows",
    duration: "2 hr 30 min",
    price: 100,
    priceLabel: "$100+",
    category: "Braidz (12+)",
    description: "Shampoo included.",
  },
  {
    id: "b13",
    name: "Smedium Knotless",
    duration: "8 hr",
    price: 300,
    priceLabel: "$300+",
    category: "Braidz (12+)",
    description: "Braiding hair color 1B only included. Mid back length.",
  },
  {
    id: "b14",
    name: "Soft Locs",
    duration: "6 hr",
    price: 250,
    priceLabel: "$250+",
    category: "Braidz (12+)",
    description:
      "HAIR NOT PROVIDED. 2 packs of Marley hair + 5 packs of Nu Locs.",
  },
  {
    id: "b15",
    name: "Tribal Braids",
    duration: "8 hr",
    price: 295,
    priceLabel: "$295+",
    category: "Braidz (12+)",
    description:
      "Price consists of 3 tiers, mid back length. Color 1B braiding hair included.",
  },

  // Locz (7)
  {
    id: "l1",
    name: "Half of Head Loc Maintenance",
    duration: "2 hr 15 min",
    price: 80,
    priceLabel: "$80+",
    category: "Locz",
    description: "Loc maintenance for half of the head.",
  },
  {
    id: "l2",
    name: "Interlock Maintenance",
    duration: "3 hr 30 min",
    price: 145,
    priceLabel: "$145+",
    category: "Locz",
    description:
      "Keep your locs going strong with a maintenance session. This service consists of shampoo & basic barrel style.",
  },
  {
    id: "l3",
    name: "Loc Maintenance (Palm Roll Method)",
    duration: "2 hr 45 min",
    price: 100,
    priceLabel: "$100+",
    category: "Locz",
    description:
      "Professional palm roll retwist to keep your locs neat, healthy, and on track.",
  },
  {
    id: "l4",
    name: "Loc Style",
    duration: "1 hr",
    price: 25,
    priceLabel: "$25+",
    category: "Locz",
    description:
      "Don't want a shampoo or retwist? Just come in to get your locs styled to your liking. Hair must be shampooed and dried. Petals and 2 strands are extra.",
  },
  {
    id: "l5",
    name: "Micro Locs Retie",
    duration: "6 hr",
    price: 165,
    priceLabel: "$165+",
    category: "Locz",
    description:
      "$165 for the first 3 hours, then $25 per hour. Shampoo is included.",
  },
  {
    id: "l6",
    name: "MicroLoc Installation",
    duration: "8 hr",
    price: 875,
    priceLabel: "$875+",
    category: "Locz",
    description:
      "MUST book a Consultation first! Starting price varies by desired size of locs, length of hair, & starting method.",
  },
  {
    id: "l7",
    name: "Starter Loc",
    duration: "5 hr",
    price: 165,
    priceLabel: "$165+",
    category: "Locz",
    description:
      "Must book a consultation before booking Starter Locs. For regular locs & microlocs.",
  },

  // Stylez (2)
  {
    id: "s1",
    name: "Silk Press",
    duration: "2 hr",
    price: 100,
    priceLabel: "$100+",
    category: "Stylez",
    description: "Sleek, smooth silk press for a polished, straightened look.",
  },
  {
    id: "s2",
    name: "Sleek Ponytail",
    duration: "2 hr 15 min",
    price: 125,
    priceLabel: "$125+",
    category: "Stylez",
    description:
      "No swoop. Buss Down part only. Hair must be shampooed & free of product. One pack of Organique (length of your choice).",
  },
];

const CATEGORIES = [
  "All",
  "Featured",
  "Kidz (6-11)",
  "Braidz (12+)",
  "Locz",
  "Stylez",
];

function ServiceItem({
  item,
  colors,
}: {
  item: Service;
  colors: ReturnType<typeof useColors>;
}) {
  const handleBook = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/(tabs)/book",
      params: {
        serviceId: item.id,
        serviceName: item.name,
        servicePrice: String(item.price),
        serviceDuration: item.duration,
      },
    });
  };

  return (
    <View
      style={[
        styles.serviceCard,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={styles.serviceInfo}>
        <Text
          style={[
            styles.serviceName,
            { color: colors.foreground, fontFamily: "Inter_600SemiBold" },
          ]}
        >
          {item.name}
        </Text>
        {item.description ? (
          <Text
            style={[
              styles.serviceDesc,
              { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
            ]}
            numberOfLines={3}
          >
            {item.description}
          </Text>
        ) : null}
        <View style={styles.metaRow}>
          <Ionicons
            name="time-outline"
            size={13}
            color={colors.mutedForeground}
          />
          <Text
            style={[
              styles.metaText,
              { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
            ]}
          >
            {item.duration}
          </Text>
        </View>
      </View>
      <View style={styles.servicePriceCol}>
        <Text
          style={[
            styles.servicePrice,
            { color: colors.primary, fontFamily: "Inter_700Bold" },
          ]}
        >
          {item.priceLabel}
        </Text>
        <Pressable
          onPress={handleBook}
          style={({ pressed }) => [
            styles.bookBtn,
            { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Text
            style={[
              styles.bookBtnText,
              {
                color: colors.primaryForeground,
                fontFamily: "Inter_600SemiBold",
              },
            ]}
          >
            Book
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function ServicesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const isWeb = Platform.OS === "web";
  const topInset = isWeb ? 67 : insets.top;

  const filtered =
    selectedCategory === "All"
      ? ALL_SERVICES
      : ALL_SERVICES.filter((s) => s.category === selectedCategory);

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
          Services
        </Text>
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(c) => c}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item: cat }) => (
            <Pressable
              onPress={() => {
                Haptics.selectionAsync();
                setSelectedCategory(cat);
              }}
              style={[
                styles.categoryChip,
                {
                  backgroundColor:
                    selectedCategory === cat ? colors.primary : colors.muted,
                  borderColor:
                    selectedCategory === cat ? colors.primary : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  {
                    color:
                      selectedCategory === cat
                        ? colors.primaryForeground
                        : colors.mutedForeground,
                    fontFamily: "Inter_500Medium",
                  },
                ]}
              >
                {cat}
              </Text>
            </Pressable>
          )}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: (isWeb ? 34 : insets.bottom) + 24 },
        ]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ServiceItem item={item} colors={colors} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
    marginBottom: 14,
  },
  categoryList: {
    gap: 8,
    paddingBottom: 2,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 13,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  serviceCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  serviceInfo: {
    flex: 1,
    gap: 5,
  },
  serviceName: {
    fontSize: 15,
    lineHeight: 20,
  },
  serviceDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  metaText: {
    fontSize: 12,
  },
  servicePriceCol: {
    alignItems: "center",
    gap: 8,
    minWidth: 70,
  },
  servicePrice: {
    fontSize: 17,
  },
  bookBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookBtnText: {
    fontSize: 13,
  },
});
