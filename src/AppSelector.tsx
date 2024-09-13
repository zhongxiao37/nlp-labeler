import { Button } from "@mui/material";


export interface IAppSelectorProps {
  selected: string;
  onAppSelect: (e: string) => void;
}

export const AppSelector: React.FC<IAppSelectorProps> = ({ selected, onAppSelect }) => {

  return (
    <div>
      <Button
        component="div"
        className="!m-2"
        variant={selected === 'intent' ? "contained" : "outlined"}
        key='intent'
        onClick={() => onAppSelect("intent")}
      >Intent</Button>
      <Button
        component="div"
        className="!m-2"
        variant={selected === 'nsp' ? "contained" : "outlined"}
        key='nsp'
        onClick={() => onAppSelect("nsp")}
      >NSP</Button>
    </div>
  );
};