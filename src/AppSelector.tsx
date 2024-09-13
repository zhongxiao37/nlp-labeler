import { Chip } from "@mui/material";


export interface IAppSelectorProps {
  selected: string;
  onAppSelect: (e: string) => void;
}

export const AppSelector: React.FC<IAppSelectorProps> = ({ selected, onAppSelect }) => {
  const label = selected === 'intent' ? 'Intent' : 'NSP';


  return (
    <div>
      <Chip
        color="primary"
        className="!p-1 !m-1"
        variant={selected === 'intent' ? "filled" : "outlined"}
        key='intent'
        label='Intent'
        onClick={() => onAppSelect("intent")}
      />
      <Chip
        color="primary"
        className="!p-1 !m-1"
        variant={selected === 'nsp' ? "filled" : "outlined"}
        key='nsp'
        label='NSP'
        onClick={() => onAppSelect("nsp")}
      />
    </div>
  );
};