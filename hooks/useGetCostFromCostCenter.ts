import { useAppSelector } from "./redux";

function useGetCostFromCostCenter(name: string) {
  const { costCenter } = useAppSelector((state) => state.settings);

  const cost = costCenter.find((cost) => cost.name === name);

  return cost || {};
}

export default useGetCostFromCostCenter;
