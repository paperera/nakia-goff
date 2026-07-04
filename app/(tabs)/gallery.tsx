import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const { width } = Dimensions.get("window");
const COLS = 2;
const GAP = 10;
const TILE_W = (width - 32 - GAP) / COLS;

interface GalleryItem {
  id: string;
  label: string;
  style: string;
  gradient: [string, string];
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: "1", label: "Knotless Braids", style: "Medium Length", gradient: ["#8B4A6B", "#C4849A"] },
  { id: "2", label: "Box Braids", style: "Waist Length", gradient: ["#4A2060", "#9B6AAB"] },
  { id: "3", label: "Passion Twists", style: "Shoulder Length", gradient: ["#6B3A4A", "#B47A8A"] },
  { id: "4", label: "Senegalese Twists", style: "Hip Length", gradient: ["#3A1A4A", "#7A5A9A"] },
  { id: "5", label: "Locs Retwist", style: "Fresh Set", gradient: ["#4A2A1A", "#8A6A5A"] },
  { id: "6", label: "Spring Twists", style: "Mid-Back", gradient: ["#1A3A4A", "#5A8A9A"] },
  { id: "7", label: "Starter Locs", style: "New Journey", gradient: ["#2A4A1A", "#6A8A5A"] },
  { id: "8", label: "Natural Style", style: "Wash & Set", gradient: ["#4A1A2A", "#9A5A7A"] },
  { id: "9", label: "Color & Braids", style: "Statement Look", gradient: ["#2A1A4A", "#6A5A9A"] },
];

const TAGS = ["All", "Braids", "Twists", "Locs", "Natural"];

function GalleryTile({ item, onPress }: { item: GalleryItem; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.tile, { opacity: pressed ? 0.9 : 1 }]}
    >
      <LinearGradient
        colors={item.gradient}
        style={[styles.tileGradient, { borderRadius: 14 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.tileOverlay}>
          <Text style={[styles.tileLabel, { fontFamily: "Inter_600SemiBold" }]}>
            {item.label}
          </Text>
          <Text style={[styles.tileStyle, { fontFamily: "Inter_400Regular" }]}>
            {item.style}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

export default function GalleryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [selectedTag, setSelectedTag] = useState("All");
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

  const isWeb = Platform.OS === "web";
  const topInset = isWeb ? 67 : insets.top;
  const bottomInset = isWeb ? 34 : insets.bottom;

  const handleTilePress = (item: GalleryItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPreviewItem(item);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topInset + 12, backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          Gallery
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagRow}
        >
          {TAGS.map((tag) => (
            <Pressable
              key={tag}
              onPress={() => {
                Haptics.selectionAsync();
                setSelectedTag(tag);
              }}
              style={[
                styles.tagChip,
                {
                  backgroundColor: selectedTag === tag ? colors.primary : colors.muted,
                  borderColor: selectedTag === tag ? colors.primary : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.tagText,
                  {
                    color: selectedTag === tag ? colors.primaryForeground : colors.mutedForeground,
                    fontFamily: "Inter_500Medium",
                  },
                ]}
              >
                {tag}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.grid, { paddingBottom: bottomInset + 24 }]}
      >
        <View style={styles.row}>
          {GALLERY_ITEMS.map((item, idx) => (
            <GalleryTile key={item.id} item={item} onPress={() => handleTilePress(item)} />
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={previewItem !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewItem(null)}
      >
        <Pressable
          style={styles.modalBg}
          onPress={() => setPreviewItem(null)}
        >
          {previewItem && (
            <View style={styles.modalCard}>
              <LinearGradient
                colors={previewItem.gradient}
                style={styles.modalGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.modalOverlay}>
                  <Text style={[styles.modalLabel, { fontFamily: "Inter_700Bold" }]}>
                    {previewItem.label}
                  </Text>
                  <Text style={[styles.modalStyle, { fontFamily: "Inter_400Regular" }]}>
                    {previewItem.style}
                  </Text>
                  <Text style={[styles.modalCredit, { fontFamily: "Inter_400Regular" }]}>
                    by Nikia Jones
                  </Text>
                </View>
              </LinearGradient>
              <Pressable
                style={styles.closeBtn}
                onPress={() => setPreviewItem(null)}
              >
                <Ionicons name="close" size={22} color="#fff" />
              </Pressable>
            </View>
          )}
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  tagRow: {
    gap: 8,
    paddingHorizontal: 4,
  },
  tagChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 13,
  },
  grid: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
  },
  tile: {
    width: TILE_W,
    height: TILE_W * 1.2,
    borderRadius: 14,
    overflow: "hidden",
  },
  tileGradient: {
    flex: 1,
    justifyContent: "flex-end",
  },
  tileOverlay: {
    padding: 12,
    gap: 2,
  },
  tileLabel: {
    fontSize: 13,
    color: "#fff",
  },
  tileStyle: {
    fontSize: 11,
    color: "rgba(255,255,255,0.75)",
  },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
  },
  modalGradient: {
    height: 320,
    justifyContent: "flex-end",
  },
  modalOverlay: {
    padding: 24,
    gap: 6,
  },
  modalLabel: {
    fontSize: 28,
    color: "#fff",
  },
  modalStyle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },
  modalCredit: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    marginTop: 4,
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
});
