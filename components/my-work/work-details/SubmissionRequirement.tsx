import { ThemedText } from "@/components/libs/ThemedText";
import { Job, QuestionCondition, RequiredProofs, Steps } from "@/types/Job";
import React from "react";
import { View } from "react-native";

const SubmissionRequirement = ({ job }: { job: Job }) => {
  const questions: QuestionCondition[] = JSON.parse(
    job.question_condition || "[]"
  );
  return (
    <>
      <View>
        <ThemedText style={{ fontWeight: "bold" }}>Instructions:</ThemedText>
        {JSON.parse(job.steps).map((step: Steps, index: number) => (
          <View key={index}>
            <ThemedText style={{ fontWeight: "bold" }}>
              Step {index + 1}:
            </ThemedText>
            <ThemedText>{step.instruction}</ThemedText>
          </View>
        ))}
      </View>

      <View>
        <ThemedText style={{ fontWeight: "bold" }}>Reqiured proofs:</ThemedText>
        {JSON.parse(job.required_proofs).map(
          (proof: RequiredProofs, index: number) => (
            <ThemedText key={index}>{proof.description}</ThemedText>
          )
        )}
      </View>

      <View>
        <ThemedText style={{ fontWeight: "bold" }}>Questions:</ThemedText>
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <View key={index}>
              <ThemedText style={{ fontWeight: "bold" }}>
                Question {index + 1}:
              </ThemedText>
              <ThemedText>{question.text}</ThemedText>
            </View>
          ))
        ) : (
          <ThemedText variant="small">There are no questions</ThemedText>
        )}
      </View>
    </>
  );
};

export default SubmissionRequirement;
