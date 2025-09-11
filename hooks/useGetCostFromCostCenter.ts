import { CostName } from "@/types/CostCenter";
import { useAppSelector } from "./redux";

function useGetCostFromCostCenter(name: CostName): number {
  const { costCenter } = useAppSelector((state) => state.settings);

  const cost = costCenter.find((cost) => cost.name === name);

  return cost?.cost ?? 0;
}

export default useGetCostFromCostCenter;
