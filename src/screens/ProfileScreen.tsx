
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import AnimatedPressable from "../components/AnimatedPressable";
import { shadows3D } from "../styles/3dStyles";


export default function ProfileScreen() {
  const { colors } = useTheme();
  const { scheme, toggleScheme } = useContext(ThemeContext);
  

  return (
    <ScrollView style={{ backgroundColor: colors.background }} showsVerticalScrollIndicator={true}>
      {/* Profile Header Background */}
      <View style={[styles.headerBg, styles.headerBg3D, { backgroundColor: colors.primary }]}>
        <View style={styles.headerContent}>
          <View style={styles.avatarSection}>
            <View style={[styles.avatar, styles.avatar3D, { backgroundColor: colors.card, borderColor: "#fff" }]}>
              <Ionicons name="person" size={48} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.profileName, { color: "#fff" }]}>Alex Morgan</Text>
              <Text style={[styles.profileRole, { color: "rgba(255,255,255,0.8)" }]}>AI Training Partner</Text>
            </View>
            <AnimatedPressable style={[styles.themeToggle, styles.themeToggle3D]} onPress={toggleScheme}>
              <Ionicons name={scheme === "dark" ? "moon" : "sunny"} size={24} color="#fff" />
            </AnimatedPressable>
          </View>
        </View>
      </View>

      <View style={[styles.container, { backgroundColor: colors.background }]}> 
        {/* Stats Section */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.statCard3D, { backgroundColor: colors.card }]}> 
            <View style={[styles.statIconBox, { backgroundColor: colors.primary }]}>
              <Ionicons name="barbell" size={20} color="#fff" />
            </View>
            <Text style={[styles.statValue, { color: colors.primary }]}>15</Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>Workouts</Text>
          </View>
          <View style={[styles.statCard, styles.statCard3D, { backgroundColor: colors.card }]}> 
            <View style={[styles.statIconBox, { backgroundColor: "#ff6b35" }]}>
              <Ionicons name="calendar" size={20} color="#fff" />
            </View>
            <Text style={[styles.statValue, { color: "#ff6b35" }]}>8</Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>Active Days</Text>
          </View>
          <View style={[styles.statCard, styles.statCard3D, { backgroundColor: colors.card }]}> 
            <View style={[styles.statIconBox, { backgroundColor: "#ffd700" }]}>
              <Ionicons name="star" size={20} color="#fff" />
            </View>
            <Text style={[styles.statValue, { color: "#ffd700" }]}>5</Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>Badges</Text>
          </View>
        </View>

        {/* Membership Section */}
        <View style={[styles.membershipCard, styles.card3D, { backgroundColor: colors.card }]}> 
          <View style={styles.membershipHeader}>
            <Ionicons name="shield" size={24} color={colors.primary} />
            <Text style={[styles.membershipTitle, { color: colors.text }]}>Membership</Text>
          </View>
          <Text style={[styles.membershipType, { color: colors.primary }]}>Premium AI Plan</Text>
          <Text style={[styles.membershipInfo, { color: colors.text }]}>Unlimited workouts & personalized AI coaching</Text>
        </View>

        {/* Weekly Goal Section */}
        <View style={[styles.goalCard, styles.card3D, { backgroundColor: colors.card }]}> 
          <View style={styles.goalHeader}>
            <Ionicons name="flag" size={24} color={colors.primary} />
            <Text style={[styles.goalTitle, { color: colors.text }]}>Weekly Goal</Text>
          </View>
          <View style={styles.goalItems}>
            <View style={styles.goalItem}>
              <View style={[styles.goalCheckmark, { backgroundColor: colors.primary }]}>
                <Ionicons name="checkmark" size={14} color="#fff" />
              </View>
              <Text style={[styles.goalItemText, { color: colors.text }]}>3 workouts this week</Text>
            </View>
            <View style={styles.goalItem}>
              <View style={[styles.goalCheckmark, { backgroundColor: colors.primary }]}>
                <Ionicons name="flag" size={14} color="#fff" />
              </View>
              <Text style={[styles.goalItemText, { color: colors.text }]}>Next milestone: 5 workouts</Text>
            </View>
          </View>
        </View>

        {/* Badges Section */}
        <View style={[styles.badgesCard, styles.card3D, { backgroundColor: colors.card }]}> 
          <View style={styles.badgesHeader}>
            <Ionicons name="trophy" size={24} color={colors.primary} />
            <Text style={[styles.badgesTitle, { color: colors.text }]}>Achievements</Text>
          </View>
          <View style={styles.badgeGrid}>
            <View style={[styles.badge, styles.badge3D, { backgroundColor: colors.primary }]}> 
              <Ionicons name="flame" size={24} color="#fff" />
              <Text style={styles.badgeLabel}>Fire</Text>
              <Text style={styles.badgeSubtext}>Starter</Text>
            </View>
            <View style={[styles.badge, styles.badge3D, { backgroundColor: "#ff6b35" }]}> 
              <Ionicons name="trophy" size={24} color="#fff" />
              <Text style={styles.badgeLabel}>Top</Text>
              <Text style={styles.badgeSubtext}>Performer</Text>
            </View>
            <View style={[styles.badge, styles.badge3D, { backgroundColor: "#4f46e5" }]}> 
              <Ionicons name="star" size={24} color="#fff" />
              <Text style={styles.badgeLabel}>Rising</Text>
              <Text style={styles.badgeSubtext}>Star</Text>
            </View>
            <View style={[styles.badge, styles.badge3D, { backgroundColor: "#10b981" }]}> 
              <Ionicons name="checkmark-done" size={24} color="#fff" />
              <Text style={styles.badgeLabel}>100%</Text>
              <Text style={styles.badgeSubtext}>Complete</Text>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <AnimatedPressable style={[styles.settingsButton, styles.settingsButton3D, { backgroundColor: colors.primary }]}> 
          <Ionicons name="settings" size={20} color="#fff" />
          <Text style={styles.settingsButtonText}>View Settings & Preferences</Text>
        </AnimatedPressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  headerBg: {
    paddingTop: 22,
    paddingBottom: 14,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerBg3D: {
    ...shadows3D.deep,
    borderWidth: 0,
  },
  headerContent: {
    paddingHorizontal: 16,
  },
  avatarSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2, 
  },
  avatar3D: {
    ...shadows3D.medium,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "800",
  },
  profileRole: {
    fontSize: 13,
    fontWeight: "500",
    marginTop: 4,
  },
  themeToggle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  themeToggle3D: {
    ...shadows3D.soft,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
  },
  statCard3D: {
    ...shadows3D.medium,
    borderWidth: 0,
  },
  statIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    ...shadows3D.soft,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 6,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  card3D: {
    ...shadows3D.medium,
    borderWidth: 0,
  },
  membershipCard: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  membershipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  membershipTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  membershipType: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  membershipInfo: {
    fontSize: 13,
    fontWeight: "500",
  },
  goalCard: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  goalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 10,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  goalItems: {
    gap: 10,
  },
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  goalCheckmark: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    ...shadows3D.soft,
  },
  goalItemText: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  badgesCard: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
  },
  badgesHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  badgesTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  badge: {
    width: "48%",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  badge3D: {
    ...shadows3D.medium,
    borderWidth: 0,
  },
  badgeLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
  },
  badgeSubtext: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  settingsButton: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 24,
  },
  settingsButton3D: {
    ...shadows3D.deep,
    borderWidth: 0,
  },
  settingsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
