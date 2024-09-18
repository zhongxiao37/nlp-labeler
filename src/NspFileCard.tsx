import React from "react";
import { NspFileCardLine } from "./NspFileCardLine";


interface INspFileCardProps {
  questionFile?: string;
  answerFile?: string;
  labelFile?: string;
  slotsFile?: string;
  selectedSlotsFile?: string;
}


export const NspFileCard: React.FC<INspFileCardProps> = ({ questionFile, answerFile, labelFile, slotsFile }) => {
  const [labels, setLabels] = React.useState<string[]>([]);
  const [questions, setQuestions] = React.useState<string[]>([]);
  const [answers, setAnswers] = React.useState<string[]>([]);

  const [inputs, setInputs] = React.useState<string[]>([]);
  const [slots, setSlots] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (labelFile) {
      setLabels(labelFile.split(/\r\n|\n/));
    }
  }, [labelFile]);

  React.useEffect(() => {
    if (questionFile) {
      setQuestions(questionFile.split(/\r\n|\n/));
    }
  }, [questionFile]);

  React.useEffect(() => {
    if (answerFile) {
      setAnswers(answerFile.split(/\r\n|\n/));
    }
  }, [answerFile]);

  React.useEffect(() => {
    if (slotsFile) {
      setSlots(slotsFile.split(/\r\n|\n/));
    }
  }, [slotsFile]);

  React.useEffect(() => {
    const inputs_ = questions.map((q, i) => [q, answers[i]].join(' '));
    setInputs(inputs_);
  }, [questions, answers]);



  return (
    <div className="p-2">
      <NspFileCardLine inputs={inputs} labels={labels} slots={slots} />
    </div>);
};

export default NspFileCard;