import { ReportParamsType } from "middleware/models.interface";

export const formatFormData = (
  data: Record<string, string>,
  params: ReportParamsType[]
) => {
  const arr = params.map((params) => {
    return {
      keyword: params.keyword,
      value: data[params.keyword],
      unit: params.unit,
      normalRange: params.normalRange,
    };
  });
  return arr;
};
export function classNames(...classes: [string, string]) {
  return classes.filter(Boolean).join(" ");
}
