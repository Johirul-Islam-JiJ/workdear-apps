import Container from "@/components/common/Container";
import Collupsable from "@/components/libs/Collupsable";
import ContentRenderer from "@/components/libs/ContentRenderer";
import { useGetFaqContentQuery } from "@/store/features/content";
import { Faq } from "@/types/Faq";
import React from "react";

const FaqScreen = () => {
  const { data } = useGetFaqContentQuery();
  const faqData: Faq[] = data?.faq_data ?? [];

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
