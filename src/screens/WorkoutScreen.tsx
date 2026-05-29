import { useMemo, useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Modal, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AnimatedPressable from "../components/AnimatedPressable";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { shadows3D } from "../styles/3dStyles";

const STORAGE_KEY = "@fitnex_custom_workouts";
const CATEGORIES = ["Full Body", "Upper Body", "Lower Body", "Cardio", "Core", "Stretching"];

export default function WorkoutScreen({ route }: any) {
  const { colors } = useTheme();
  const workout = useMemo(
    () =>
      route.params?.workout || {
        name: "Total Body Burn",
        description: "A balanced routine for strength, mobility, and energy.",
        sets: 4,
        reps: 10,
        intensity: "Medium",
      },
    [route.params]
  );
  const [completed, setCompleted] = useState(false);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDesc, setWorkoutDesc] = useState("");
  const [workoutSets, setWorkoutSets] = useState("3");
  const [workoutReps, setWorkoutReps] = useState("10");
  const [workoutIntensity, setWorkoutIntensity] = useState("Medium");
  const [workoutCategory, setWorkoutCategory] = useState(CATEGORIES[0]);
  const [workoutExercises, setWorkoutExercises] = useState<{ name: string; sets: string; reps: string }[]>([]);
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseSets, setExerciseSets] = useState("3");
  const [exerciseReps, setExerciseReps] = useState("10");
  const [customWorkouts, setCustomWorkouts] = useState<any[]>([]);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setCustomWorkouts(JSON.parse(stored));
      } catch {}
    };
    loadWorkouts();
  }, []);

  const saveWorkouts = useCallback(async (workouts: any[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
    } catch {}
  }, []);

  const handleAddWorkout = () => {
    if (!workoutName.trim()) return;
    const newWorkout = {
      id: Date.now().toString(),
      name: workoutName.trim(),
      description: workoutDesc.trim() || "Custom workout",
      category: workoutCategory,
      exercises: workoutExercises.length > 0 ? workoutExercises : [{ name: workoutName.trim(), sets: workoutSets, reps: workoutReps }],
      sets: parseInt(workoutSets) || 3,
      reps: parseInt(workoutReps) || 10,
      intensity: workoutIntensity,
      isCustom: true,
    };
    const updated = [...customWorkouts, newWorkout];
    setCustomWorkouts(updated);
    saveWorkouts(updated);
    setWorkoutName("");
    setWorkoutDesc("");
    setWorkoutSets("3");
    setWorkoutReps("10");
    setWorkoutIntensity("Medium");
    setWorkoutCategory(CATEGORIES[0]);
    setWorkoutExercises([]);
    setExerciseName("");
    setShowAddWorkout(false);
  };

  const handleDeleteWorkout = (id: string) => {
    const updated = customWorkouts.filter(w => w.id !== id);
    setCustomWorkouts(updated);
    saveWorkouts(updated);
  };

  const addExercise = () => {
    if (!exerciseName.trim()) return;
    setWorkoutExercises([...workoutExercises, { name: exerciseName.trim(), sets: exerciseSets, reps: exerciseReps }]);
    setExerciseName("");
    setExerciseSets("3");
    setExerciseReps("10");
  };

  const removeExercise = (index: number) => {
    setWorkoutExercises(workoutExercises.filter((_, i) => i !== index));
  };

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      showsVerticalScrollIndicator={true}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}> 
        {/* Header with background */}
        <View style={[styles.headerCard, styles.headerCard3D, { backgroundColor: colors.primary }]}>
          <View style={styles.headerIcon}>
            <Ionicons
              name={
                workout.name.includes("Push")
                  ? "fitness"
                  : workout.name.includes("Squat")
                  ? "barbell"
                  : workout.name.includes("Jump")
                  ? "walk"
                  : "body"
              }
              size={45}
              color="#fff"
            />
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={[styles.heading, { color: "#fff" }]}>{workout.name}</Text>
            <Text style={[styles.subheading, { color: "rgba(255,255,255,0.8)" }]}>{workout.description}</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsRow}>
          <View style={[styles.statBlock, styles.statBlock3D, { backgroundColor: colors.card }]}> 
            <Ionicons name="layers" size={20} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.text }]}>{workout.sets}</Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>Sets</Text>
          </View>
          <View style={[styles.statBlock, styles.statBlock3D, { backgroundColor: colors.card }]}> 
            <Ionicons name="repeat" size={20} color="#ff6b35" />
            <Text style={[styles.statValue, { color: colors.text }]}>{workout.reps}</Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>Reps</Text>
          </View>
          <View style={[styles.statBlock, styles.statBlock3D, { backgroundColor: colors.card }]}> 
            <Ionicons name="flame" size={20} color="#ffd700" />
            <Text style={[styles.statValue, { color: colors.text }]}>{workout.intensity}</Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>Intensity</Text>
          </View>
        </View>

        {/* Focus Card */}
        <View style={[styles.summaryCard, styles.summaryCard3D, { backgroundColor: colors.card }]}> 
          <View style={styles.focusHeader}>
            <Ionicons name="bulb" size={24} color={colors.primary} />
            <Text style={[styles.summaryTitle, { color: colors.text }]}>Today's Focus</Text>
          </View>
          <Text style={[styles.summaryText, { color: colors.text }]}>Keep your pace steady, rest 45 seconds between sets, and focus on full range of motion.</Text>
        </View>

        {/* Tips Section */}
        <View style={[styles.tipsCard, styles.tipsCard3D, { backgroundColor: colors.card }]}>
          <Text style={[styles.tipsTitle, { color: colors.text }]}>Pro Tips</Text>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
            <Text style={[styles.tipText, { color: colors.text }]}>Warm up for 5 minutes before starting</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
            <Text style={[styles.tipText, { color: colors.text }]}>Stay hydrated throughout the workout</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
            <Text style={[styles.tipText, { color: colors.text }]}>Cool down and stretch after completion</Text>
          </View>
        </View>

        {/* Custom Workouts Section */}
        {customWorkouts.length > 0 && (
          <View style={[styles.customWorkoutsCard, styles.customCard3D, { backgroundColor: colors.card }]}>
            <Text style={[styles.customTitle, { color: colors.text }]}>Your Custom Workouts</Text>
            {customWorkouts.map((cw) => (
              <View key={cw.id} style={[styles.customWorkoutItem, { borderBottomColor: colors.border }]}>
                <View style={styles.customWorkoutContent}>
                  <Text style={[styles.customWorkoutName, { color: colors.text }]}>{cw.name}</Text>
                  <View style={styles.customTags}>
                    <Text style={[styles.customTag, { backgroundColor: colors.primary + "20", color: colors.primary }]}>{cw.category || "General"}</Text>
                    <Text style={[styles.customTag, { backgroundColor: colors.primary + "20", color: colors.primary }]}>{cw.intensity}</Text>
                  </View>
                  <Text style={[styles.customWorkoutDesc, { color: colors.text }]}>{cw.exercises ? `${cw.exercises.length} exercises` : `${cw.sets} sets × ${cw.reps} reps`}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDeleteWorkout(cw.id)}>
                  <Ionicons name="close-circle" size={24} color="#ff6b35" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Add Custom Workout Button */}
        <AnimatedPressable
          style={[styles.addButton, styles.addButton3D, { backgroundColor: colors.primary }]}
          onPress={() => setShowAddWorkout(true)}
        >
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add Custom Workout</Text>
        </AnimatedPressable>

        {/* Action Button */}
        <AnimatedPressable
          style={[styles.actionButton, styles.actionButton3D, { backgroundColor: completed ? colors.border : colors.primary }]}
          onPress={() => setCompleted(true)}
        >
          <Ionicons name={completed ? "checkmark-done" : "play"} size={20} color="#fff" />
          <Text style={styles.actionText}>
            {completed ? "Workout Completed ✓" : "Start Workout"}
          </Text>
        </AnimatedPressable>
      </View>

      {/* Add Workout Modal */}
      <Modal
        visible={showAddWorkout}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddWorkout(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Create Custom Workout</Text>
              <TouchableOpacity onPress={() => setShowAddWorkout(false)}>
                <Ionicons name="close" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={true}>
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Workout Name *</Text>
                <TextInput
                  style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                  placeholder="e.g., Bench Press"
                  placeholderTextColor={colors.text + "80"}
                  value={workoutName}
                  onChangeText={setWorkoutName}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea, { borderColor: colors.border, color: colors.text }]}
                  placeholder="Describe your workout"
                  placeholderTextColor={colors.text + "80"}
                  value={workoutDesc}
                  onChangeText={setWorkoutDesc}
                  multiline
                />
              </View>

              {/* Category Picker */}
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Category</Text>
                <View style={styles.categoryGrid}>
                  {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      style={[
                        styles.categoryChip,
                        workoutCategory === cat && styles.categoryChipSelected,
                        {
                          backgroundColor: workoutCategory === cat ? colors.primary : colors.card,
                          borderColor: workoutCategory === cat ? "transparent" : colors.border,
                        },
                      ]}
                      onPress={() => setWorkoutCategory(cat)}
                    >
                      <Text style={[styles.categoryChipText, { color: workoutCategory === cat ? "#fff" : colors.text }]}>
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Exercises Section */}
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Exercises</Text>
                {workoutExercises.map((ex, idx) => (
                  <View key={idx} style={[styles.exerciseItem, { borderColor: colors.border }]}>
                    <View style={styles.exerciseInfo}>
                      <Text style={[styles.exerciseName, { color: colors.text }]}>{ex.name}</Text>
                      <Text style={[styles.exerciseMeta, { color: colors.text }]}>{ex.sets} × {ex.reps}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeExercise(idx)}>
                      <Ionicons name="remove-circle" size={22} color="#ff6b35" />
                    </TouchableOpacity>
                  </View>
                ))}
                <View style={styles.addExerciseRow}>
                  <TextInput
                    style={[styles.exerciseInput, { borderColor: colors.border, color: colors.text }]}
                    placeholder="Exercise name"
                    placeholderTextColor={colors.text + "80"}
                    value={exerciseName}
                    onChangeText={setExerciseName}
                  />
                  <TextInput
                    style={[styles.exerciseSmallInput, { borderColor: colors.border, color: colors.text }]}
                    placeholder="S"
                    placeholderTextColor={colors.text + "80"}
                    value={exerciseSets}
                    onChangeText={setExerciseSets}
                    keyboardType="number-pad"
                  />
                  <TextInput
                    style={[styles.exerciseSmallInput, { borderColor: colors.border, color: colors.text }]}
                    placeholder="R"
                    placeholderTextColor={colors.text + "80"}
                    value={exerciseReps}
                    onChangeText={setExerciseReps}
                    keyboardType="number-pad"
                  />
                  <TouchableOpacity style={[styles.addExerciseBtn, { backgroundColor: colors.primary }]} onPress={addExercise}>
                    <Ionicons name="add" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Default Sets/Reps for the whole workout */}
              <View style={styles.rowInputs}>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={[styles.label, { color: colors.text }]}>Default Sets</Text>
                  <TextInput
                    style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                    placeholder="3"
                    placeholderTextColor={colors.text + "80"}
                    value={workoutSets}
                    onChangeText={setWorkoutSets}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 12 }]}>
                  <Text style={[styles.label, { color: colors.text }]}>Default Reps</Text>
                  <TextInput
                    style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                    placeholder="10"
                    placeholderTextColor={colors.text + "80"}
                    value={workoutReps}
                    onChangeText={setWorkoutReps}
                    keyboardType="number-pad"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Intensity</Text>
                <View style={styles.intensityButtons}>
                  {["Light", "Medium", "Heavy"].map((level) => (
                    <TouchableOpacity
                      key={level}
                      style={[
                        styles.intensityButton,
                        {
                          backgroundColor: workoutIntensity === level ? colors.primary : colors.card,
                          borderColor: colors.border,
                        }
                      ]}
                      onPress={() => setWorkoutIntensity(level)}
                    >
                      <Text style={[styles.intensityText, { color: workoutIntensity === level ? "#fff" : colors.text }]}>
                        {level}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={[styles.modalFooter, { borderTopColor: colors.border }]}>
              <AnimatedPressable
                style={[styles.cancelButton, { borderColor: colors.border }]}
                onPress={() => setShowAddWorkout(false)}
              >
                <Text style={[styles.cancelButtonText, { color: colors.text }]}>Cancel</Text>
              </AnimatedPressable>
              <AnimatedPressable
                style={[styles.submitButton, { backgroundColor: colors.primary }]}
                onPress={handleAddWorkout}
              >
                <Text style={styles.submitButtonText}>Create Workout</Text>
              </AnimatedPressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  headerCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  headerCard3D: {
    ...shadows3D.deep,
    borderWidth: 0,
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    ...shadows3D.medium,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 6,
  },
  subheading: {
    fontSize: 15,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 10,
  },
  statBlock: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  statBlock3D: {
    ...shadows3D.medium,
    borderWidth: 0,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 10,
  },
  statLabel: {
    fontSize: 11,
    marginTop: 8,
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: 0.4,
  },
  summaryCard: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
  },
  summaryCard3D: {
    ...shadows3D.medium,
    borderWidth: 0,
  },
  focusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
  },
  tipsCard: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
  },
  tipsCard3D: {
    ...shadows3D.medium,
    borderWidth: 0,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 10,
  },
  tipText: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "500",
    flex: 1,
  },
  customWorkoutsCard: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  customCard3D: {
    ...shadows3D.medium,
    borderWidth: 0,
  },
  customTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  customWorkoutItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  customWorkoutContent: {
    flex: 1,
  },
  customWorkoutName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  customWorkoutDesc: {
    fontSize: 12,
    fontWeight: "500",
    opacity: 0.7,
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 14,
    gap: 10,
    marginBottom: 12,
  },
  addButton3D: {
    ...shadows3D.soft,
    borderWidth: 0,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  actionButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    borderRadius: 16,
    gap: 10,
  },
  actionButton3D: {
    ...shadows3D.deep,
    borderWidth: 0,
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
    ...shadows3D.deep,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  modalBody: {
    padding: 18,
  },
  modalFooter: {
    flexDirection: "row",
    gap: 12,
    padding: 18,
    borderTopWidth: 1,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    fontWeight: "500",
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  rowInputs: {
    flexDirection: "row",
  },
  intensityButtons: {
    flexDirection: "row",
    gap: 10,
  },
  intensityButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: "center",
  },
  intensityText: {
    fontWeight: "600",
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.08)",
    marginVertical: 8,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  categoryChipSelected: {
    ...shadows3D.soft,
    borderWidth: 0,
  },
  categoryChipText: {
    fontWeight: "600",
    fontSize: 12,
  },
  exerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
    ...shadows3D.soft,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 2,
  },
  exerciseMeta: {
    fontSize: 12,
    opacity: 0.7,
  },
  addExerciseRow: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  exerciseInput: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    fontSize: 13,
    fontWeight: "500",
  },
  exerciseSmallInput: {
    width: 44,
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  addExerciseBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    ...shadows3D.soft,
  },
  customTags: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
    marginBottom: 4,
  },
  customTag: {
    fontSize: 11,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: "hidden",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
  },
  cancelButtonText: {
    fontWeight: "600",
    fontSize: 15,
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    ...shadows3D.soft,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
