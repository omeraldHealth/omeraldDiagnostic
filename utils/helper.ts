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
type ImageDimensionType = {
  width: number;
  height: number;
};
export const imageWidthAndHeight = (provideFile: File) => {
  // take the given file (which should be an image) and return the width and height
  const imgDimensions: ImageDimensionType = {
    width: null,
    height: null,
  };

  return new Promise<ImageDimensionType>((resolve) => {
    const reader = new FileReader();

    reader.readAsDataURL(provideFile);
    reader.onload = function () {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = function () {
        imgDimensions.width = img.width;
        imgDimensions.height = img.height;

        resolve(imgDimensions);
      };
    };
  });
};
