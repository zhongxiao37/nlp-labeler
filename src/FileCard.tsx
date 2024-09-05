import React from "react";
import { FileCardLabels } from "./FileCardLabels";
import { FileCardLine } from "./FileCardLine";


export const FileCard: React.FC<{ inputFile?: string, labelFile?: string; outputFile?: string; }> = ({ inputFile, labelFile, outputFile }) => {
  const [labels, setLabels] = React.useState<string[]>([]);
  const [uniqueLabels, setUniqueLabels] = React.useState<string[]>([]);
  const [inputs, setInputs] = React.useState<string[]>([]);
  const [outputs, setOutputs] = React.useState<string[]>([]);

  const [label, setLabel] = React.useState<string>('');
  const [filteredInputs, setFilteredInputs] = React.useState<string[]>([]);
  const [filteredOutputs, setFilteredOutputs] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (labelFile) {
      setLabels(labelFile.split(/\r\n|\n/));
      setUniqueLabels([...new Set(labelFile.split(/\r\n|\n/))]);
    }
  }, [labelFile]);

  React.useEffect(() => {
    setLabel(uniqueLabels[0]);
  }, [labels]);

  React.useEffect(() => {
    if (inputFile) {
      setInputs(inputFile.split(/\r\n|\n/));
    }
  }, [inputFile]);

  React.useEffect(() => {
    if (outputFile) {
      setOutputs(outputFile.split(/\r\n|\n/));
    }
  }, [outputFile]);


  const handleLabelClick = (l: string) => {
    setLabel(l);
    setFilteredInputs(inputs.filter((_, idx) => labels[idx] === l));
    setFilteredOutputs(outputs.filter((_, idx) => labels[idx] === l));
  };

  return (
    <div className="p-2">
      <FileCardLabels labels={uniqueLabels} label={label} handleClick={handleLabelClick} />
      <FileCardLine inputs={filteredInputs} label={label} outputs={filteredOutputs} />
    </div>);
};

export default FileCard;