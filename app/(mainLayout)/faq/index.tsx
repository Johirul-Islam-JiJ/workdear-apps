import Container from "@/components/common/Container";
import Collupsable from "@/components/libs/Collupsable";
import ContentRenderer from "@/components/libs/ContentRenderer";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { useGetFaqContentQuery } from "@/store/features/content";
import { Faq } from "@/types/Faq";
import React from "react";

const FaqScreen = () => {
  const { data, isLoading } = useGetFaqContentQuery();
  const faqData: Faq[] = data?.faq_data ?? [];

  if (isLoading) return <LoadingIndicator fullScreen />;

  return (
    <Container rowGap={8}>
      {faqData.map((item, index) => (
        <Collupsable
          key={index}
          title={item.question}
          description={<ContentRenderer html={item.answer} />}
        />
      ))}
    </Container>
  );
};

export default FaqScreen;
