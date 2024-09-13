import { Chip } from "@mui/material";

interface IFileCardLabelsProps {
  labels?: { l: string, c: number; }[],
  label: string,
  handleClick: (label: string) => void;
}

export const FileCardLabels: React.FC<IFileCardLabelsProps> = ({ labels, label, handleClick }) => {

  return (
    <>
      {
        labels?.map(({ l, c }, idx) => {
          const selected = l === label;
          const chip = <Chip
            key={idx}
            className="!m-1"
            label={l + "(" + c + ")"}
            variant={selected ? 'filled' : "outlined"}
            color={selected ? 'primary' : 'default'}
            onClick={() => handleClick(l)}
          />;
          return chip;
        })
      }
    </>
  );
};