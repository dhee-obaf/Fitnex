import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { ThemeContext } from "../context/ThemeContext";
import AnimatedPressable from "../components/AnimatedPressable";
import { shadows3D, styles3D, depth3D } from "../styles/3dStyles";

const STORAGE_KEY = "@fitnex_daily_metrics";

export default function HomeScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { scheme, toggleScheme } = useContext(ThemeContext);
  const [workouts] = useState([
    {
      id: "1",
      name: "Push Ups",
      description: "Strengthen your chest and arms.",
      goal: "Build upper body strength with a classic bodyweight move.",
      steps: [
        "Start in a plank position with your hands under your shoulders.",
        "Lower your body until your chest is just above the floor.",
        "Push back up through your palms until your arms are straight.",
        "Keep your core tight and maintain a straight line from head to heels.",
      ],
      tips: "If full push-ups are too hard, start with knee push-ups or incline push-ups on a bench.",
    },
    {
      id: "2",
      name: "Squats",
      description: "Build powerful legs and glutes.",
      goal: "Increase lower-body strength and improve mobility.",
      steps: [
        "Stand with feet about shoulder-width apart.",
        "Push your hips back and bend your knees as if sitting in a chair.",
        "Keep your chest lifted and knees tracking over your toes.",
        "Drive through your heels to stand back up.",
      ],
      tips: "Press your knees slightly outward and keep your weight in your heels to protect your knees.",
    },
    {
      id: "3",
      name: "Jump Rope",
      description: "Boost cardio and agility.",
      goal: "Improve heart health and coordination with a fast-paced interval move.",
      steps: [
        "Hold the rope handles at your sides with the rope behind you.",
        "Swing the rope over your head and jump as it passes your feet.",
        "Land softly on the balls of your feet with knees slightly bent.",
        "Keep your elbows close to your body and use your wrists to turn the rope.",
      ],
      tips: "Start with single jumps and keep the rope low to the ground for a smoother rhythm.",
    },
    {
      id: "4",
      name: "Weights",
      description: "Build strength and muscle.",
      goal: "Use weighted resistance to grow muscle and improve functional strength.",
      steps: [
        "Choose a weight that challenges you but allows good form.",
        "Use controlled reps and focus on the muscle group you're working.",
        "Breathe out during the exertion phase and in while returning to start.",
        "Rest 60-90 seconds between sets and keep your movements steady.",
      ],
      tips: "Keep your spine neutral, avoid swinging the weight, and prioritize quality reps over speed.",
    },
  ]);
  const [checkinCount, setCheckinCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [steps, setSteps] = useState(4720);
  const [goal, setGoal] = useState(8000);
  const [selectedWorkout, setSelectedWorkout] = useState<any | null>(null);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);

  useEffect(() => {
    const updateDailyMetrics = async () => {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const data = raw ? JSON.parse(raw) : null;
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

        let updated = {
          lastDate: today,
          checkinCount: 1,
          streak: 1,
          steps,
        };

        if (data) {
          const sameDay = data.lastDate === today;
          const consecutive = data.lastDate === yesterday;
          updated.checkinCount = sameDay ? data.checkinCount : data.checkinCount + 1;
          updated.streak = sameDay ? data.streak : consecutive ? data.streak + 1 : 1;
          updated.steps = data.steps ?? steps;
        }

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setCheckinCount(updated.checkinCount);
        setStreak(updated.streak);
        setSteps(updated.steps);
      } catch (error) {
        console.warn("Failed to update daily metrics", error);
      }
    };

    updateDailyMetrics();
  }, []);

  const progress = Math.min((steps / goal) * 100, 100);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      showsVerticalScrollIndicator={true}
    >
      <View style={[styles.heroCard, { backgroundColor: colors.primary }]}> 
        <View style={styles.heroHeader}>
          <View>
            <Text style={[styles.heroTitle, { color: "#fff", fontFamily: "FugazOne_400Regular" }]}>Fitnex</Text>
            <Text style={[styles.heroSubtitle, { color: "rgba(255,255,255,0.85)" }]}>Your AI Fitness Companion</Text>
          </View>
          <AnimatedPressable style={styles.toggleButton} onPress={toggleScheme}>
            <Ionicons name={scheme === "dark" ? "moon" : "sunny"} size={20} color="#fff" />
          </AnimatedPressable>
        </View>
      </View>

      <View style={[styles.welcomeCard, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <View style={styles.welcomeContent}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.welcomeTitle, { color: colors.text }]}>Welcome back, David! 🎉</Text>
            <Text style={[styles.welcomeSubtitle, { color: colors.text }]}>Your last visit was tracked today</Text>
          </View>
          <Ionicons name="checkmark-circle" size={28} color={colors.primary} />
        </View>
      </View>

      <View style={styles.metricsContainer}>
        <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}> 
          <View style={[styles.metricIconBox, { backgroundColor: colors.primary }]}>
            <Ionicons name="calendar" size={20} color="#fff" />
          </View>
          <Text style={[styles.metricLabel, { color: colors.text }]}>Check-Ins</Text>
          <Text style={[styles.metricValue, { color: colors.primary }]}>{checkinCount}</Text>
        </View>
        <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}> 
          <View style={[styles.metricIconBox, { backgroundColor: "#ff6b35" }]}>
            <Ionicons name="flame" size={20} color="#fff" />
          </View>
          <Text style={[styles.metricLabel, { color: colors.text }]}>Streak</Text>
          <Text style={[styles.metricValue, { color: "#ff6b35" }]}>{streak} days</Text>
        </View>
        <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}> 
          <View style={[styles.metricIconBox, { backgroundColor: "#ffd700" }]}>
            <Ionicons name="star" size={20} color="#fff" />
          </View>
          <Text style={[styles.metricLabel, { color: colors.text }]}>Achievements</Text>
          <Text style={[styles.metricValue, { color: "#ffd700" }]}>5</Text>
        </View>
      </View>

      <View style={[styles.stepsCard, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <View style={styles.stepsHeader}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.stepsTitle, { color: colors.text }]}>Today's Steps</Text>
            <Text style={[styles.stepsProgress, { color: colors.text }]}>
              {steps.toLocaleString()} / {goal.toLocaleString()}
            </Text>
          </View>
          <View style={[styles.stepsPercentage, { backgroundColor: colors.primary }]}>
            <Text style={styles.stepsPercent}>{Math.round(progress)}%</Text>
          </View>
        </View>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: colors.primary }]} />
        </View>
        <Text style={[styles.stepsTarget, { color: colors.text }]}>
          {goal - steps > 0 ? `${(goal - steps).toLocaleString()} steps to goal` : '✓ Goal reached!'}
        </Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recommended Workouts</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.text }]}>Pick one to get started</Text>
      </View>

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setSelectedWorkout(item);
              setShowWorkoutModal(true);
            }}
            style={[styles.card, styles.card3D, { backgroundColor: colors.card }]}
          >
            <View style={styles.cardContent}>
              <View style={[styles.cardIcon, styles.workoutImageContainer, { backgroundColor: colors.primary }]}>
                <Ionicons
                  name={
                    item.name.includes("Push")
                      ? "fitness"
                      : item.name.includes("Squat")
                      ? "trending-down"
                      : item.name.includes("Jump")
                      ? "body"
                      : "barbell"
                  }
                  size={28}
                  color="#fff"
                />
              </View>
              <View style={styles.cardText}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{item.name}</Text>
                <Text style={[styles.cardDescription, { color: colors.text }]}>{item.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.primary} />
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={showWorkoutModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowWorkoutModal(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: "rgba(0,0,0,0.45)" }]}> 
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}> 
            <Text style={[styles.modalTitle, { color: colors.text }]}>{selectedWorkout?.name}</Text>
            <Text style={[styles.modalDescription, { color: colors.text, marginBottom: 12 }]}>{selectedWorkout?.goal}</Text>
            <Text style={[styles.modalSectionTitle, { color: colors.text }]}>How to do it</Text>
            {selectedWorkout?.steps?.map((step: string, index: number) => (
              <View key={index} style={styles.modalStepRow}>
                <Text style={[styles.modalStepBullet, { color: colors.primary }]}>•</Text>
                <Text style={[styles.modalStepText, { color: colors.text }]}>{step}</Text>
              </View>
            ))}
            <Text style={[styles.modalSectionTitle, { color: colors.text, marginTop: 18 }]}>Quick tip</Text>
            <Text style={[styles.modalTipText, { color: colors.text }]}>{selectedWorkout?.tips}</Text>
            <TouchableOpacity
              style={[styles.modalCloseButton, { backgroundColor: colors.primary }]}
              onPress={() => setShowWorkoutModal(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    padding: 24,
    marginBottom: 20,
    marginHorizontal: -16,
    marginTop: -16,
    paddingTop: 10,
    paddingBottom: 8,
    ...shadows3D.deep,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 1,
  },
  heroSubtitle: {
    fontSize: 14,
    marginTop: -6,
    fontWeight: "500",
  },
  toggleButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    ...shadows3D.soft,
  },
  welcomeCard: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    ...shadows3D.medium,
    borderWidth: 0,
  },
  welcomeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 13,
    fontWeight: "500",
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  metricCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    ...shadows3D.medium,
    borderWidth: 0,
  },
  metricIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    ...shadows3D.soft,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "800",
  },
  stepsCard: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    ...shadows3D.medium,
    borderWidth: 0,
  },
  stepsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    gap: 12,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  stepsProgress: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 6,
  },
  stepsPercentage: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    ...shadows3D.medium,
  },
  stepsPercent: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  progressBarBackground: {
    height: 10,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "rgba(94, 26, 150, 0.1)",
    ...shadows3D.inset,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 10,
    ...shadows3D.soft,
  },
  stepsTarget: {
    fontSize: 12,
    fontWeight: "500",
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  sectionSubtitle: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: "500",
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  card3D: {
    ...shadows3D.medium,
    borderWidth: 0,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  workoutImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 14,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardDescription: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    width: "100%",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  modalStepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 8,
  },
  modalStepBullet: {
    fontSize: 18,
    lineHeight: 22,
  },
  modalStepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },
  modalTipText: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 4,
  },
  modalCloseButton: {
    alignSelf: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  modalCloseText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
