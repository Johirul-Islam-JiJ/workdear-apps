import Container from "@/components/common/Container";
import InstantVerification from "@/components/verification/InstantVerification";
import ManualVerificationGuard from "@/components/verification/ManualVerificationGuard";
import React from "react";

const Verification = () => {
  return (
    <Container>
      <InstantVerification />
      <ManualVerificationGuard />
    </Container>
  );
};

export default Verification;
