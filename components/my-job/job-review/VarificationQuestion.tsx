import Card from "@/components/libs/Card";
import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { Answer, QuestionCondition } from "@/types/Job";
import { JobSubmission } from "@/types/submission";
import React from "react";

type Props = {
  submission: JobSubmission;
};

const VarificationQuestion = ({ submission }: Props) => {
  if (!submission.job.question_condition || !submission.answer) return null;
  const questions: QuestionCondition[] = JSON.parse(
    submission.job.question_condition
  );

  const answers: Answer = JSON.parse(submission.answer);
  return (
    <Card>
      <ThemedText variant="bodySemiBold">Verification Question</ThemedText>
      {questions.map((question, index) => (
        <ThemedView
          color={
            question.condition.value === answers[question.id]
              ? "success"
              : "error"
          }
          style={{ padding: 10, borderRadius: 10 }}
          key={index}
        >
          <ThemedText>{`Q${index + 1}: ${question.text}`}</ThemedText>
          <ThemedText>{`User answer: ${answers[question.id]}`}</ThemedText>
          <ThemedText>{`Actual answer: ${question.condition.value}`}</ThemedText>
        </ThemedView>
      ))}
    </Card>
  );
};

export default VarificationQuestion;
