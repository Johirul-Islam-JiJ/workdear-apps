import { ThemedText } from "@/components/libs/ThemedText";
import { Job, QuestionCondition } from "@/types/Job";
import React from "react";
import { View } from "react-native";

const Questions = ({ job }: { job: Job }) => {
  const questions: QuestionCondition[] = JSON.parse(
    job.question_condition || "[]"
  );

  return (
    <>
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
    </>
  );
};

export default Questions;
