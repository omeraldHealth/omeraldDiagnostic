export interface SelectComponentProps {
  selected: {
    id: number;
    name: string;
  };
  setSelected: (val: { id: number; name: string }) => void;

  data: { id: number; name: string }[];
  labelName: string;
}
