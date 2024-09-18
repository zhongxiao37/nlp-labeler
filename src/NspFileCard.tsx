import React from "react";
import { NspFileCardLine } from "./NspFileCardLine";
import { Pagination } from "@mui/material";


interface INspFileCardProps {
  questionFile?: string;
  answerFile?: string;
  labelFile?: string;
  slotsFile?: string;
  selectedSlotsFile?: string;
}

export const PAGE_SIZE = 10;


export const NspFileCard: React.FC<INspFileCardProps> = ({ questionFile, answerFile, labelFile, slotsFile, selectedSlotsFile }) => {
  const [labels, setLabels] = React.useState<string[]>([]);
  const [questions, setQuestions] = React.useState<string[]>([]);
  const [answers, setAnswers] = React.useState<string[]>([]);

  const [inputs, setInputs] = React.useState<string[]>([]);
  const [slots, setSlots] = React.useState<string[]>([]);
  const [selectedSlots, setSelectedSlots] = React.useState<string[]>([]);

  const [filteredInputs, setFilteredInputs] = React.useState<string[]>([]);
  const [filteredLabels, setFilteredLabels] = React.useState<string[]>([]);
  const [filteredSlots, setFilteredSlots] = React.useState<string[]>([]);
  const [filteredSelectedSlots, setFilteredSelectedSlots] = React.useState<string[]>([]);

  const [page, setPage] = React.useState<number>(0);

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
    if (selectedSlotsFile) {
      setSelectedSlots(selectedSlotsFile.split(/\r\n|\n/));
    }
  }, [selectedSlotsFile]);

  React.useEffect(() => {
    const inputs_ = questions.map((q, i) => [q, answers[i]].join(' '));
    setInputs(inputs_);
  }, [questions, answers]);

  React.useEffect(() => {
    const initialPage = 1;
    setPage(initialPage);
    setFilteredInputs(inputs.slice(0, PAGE_SIZE));
    setFilteredLabels(labels.slice(0, PAGE_SIZE));
    setFilteredSlots(slots.slice(0, PAGE_SIZE));
    setFilteredSelectedSlots(selectedSlots.slice(0, PAGE_SIZE));
  }, [inputs]);

  const handlePagination = (_: any, page: number) => {
    setPage(page);
    setFilteredInputs(inputs.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page));
    setFilteredLabels(labels.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page));
    setFilteredSlots(slots.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page));
    setFilteredSelectedSlots(selectedSlots.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page));
  };

  return (
    <div className="p-2 flex items-center flex-col">
      <NspFileCardLine inputs={filteredInputs} labels={filteredLabels} slots={filteredSlots} selectedSlots={filteredSelectedSlots} page={page} />
      {labels.length > 0 && <Pagination page={page} count={Math.floor(labels.length / PAGE_SIZE) + 1} color="primary" onChange={handlePagination} />}
    </div>);
};

export default NspFileCard;