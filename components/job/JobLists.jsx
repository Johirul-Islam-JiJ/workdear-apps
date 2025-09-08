import { View } from "react-native";
import Button from "../libs/Button";
import JobCard from "./JobCard";

const JobLists = () => {
  return (
    <View style={{ rowGap: 10 }}>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <JobCard key={i} />
        ))}

      <View style={{ alignItems: "center" }}>
        <Button title="View More" />
      </View>
    </View>
  );
};

export default JobLists;
