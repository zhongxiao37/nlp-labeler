import { useState } from 'react';
import { UploadFiles } from './UploadFiles';
import { Typography } from '@mui/material';
import NspFileCard from './NspFileCard';

const NspApp = () => {

  const [questionFile, setQuestionFile] = useState<string>();
  const [answerFile, setAnswerFile] = useState<string>();

  const [labelFile, setLabelFile] = useState<string>();

  const [slotsFile, setSlotsFile] = useState<string>();
  const [selectedSlotsFile, setSelectedSlotsFile] = useState<string>();


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files === null) return;

    Array.from(files).map((f) => {
      console.log(f);
      if (f.name === 'questions') {
        const reader = new FileReader();

        reader.onload = function (e) {
          const content = e.target?.result as string;
          content && setQuestionFile(content);
        };

        reader.readAsText(f);
      } else if (f.name === 'answers') {
        const reader = new FileReader();

        reader.onload = function (e) {
          const content = e.target?.result as string;
          content && setAnswerFile(content);
        };

        reader.readAsText(f);
      } else if (f.name === 'label.slots') {
        const reader = new FileReader();

        reader.onload = function (e) {
          const content = e.target?.result as string;
          content && setSlotsFile(content);
        };

        reader.readAsText(f);
      } else if (f.name === 'label.selected_slots') {
        const reader = new FileReader();

        reader.onload = function (e) {
          const content = e.target?.result as string;
          content && setSelectedSlotsFile(content);
        };

        reader.readAsText(f);
      } else if (f.name === 'label.nsp') {
        const reader = new FileReader();

        reader.onload = function (e) {
          const content = e.target?.result as string;
          content && setLabelFile(content);
        };

        reader.readAsText(f);
      }
      else {
        console.error("unsupported file: ", f.name);
      }
    });
  };

  return (
    <div>
      {(labelFile === undefined) &&
        <div className='h-full flex flex-col justify-center'>
          <Typography variant='h5' >Upload your data files</Typography>
          <Typography variant="h6" gutterBottom>
            `questions` & `answers` for raw inputs
          </Typography>
          <Typography variant="h6" gutterBottom>
            `label` for if question and answer are pair
            <Typography variant="subtitle2" gutterBottom>
              0 indicates answer is a continuation of question,
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              1 indicates answer is a random sequence.
            </Typography>
          </Typography>
          <Typography variant="h6" gutterBottom>
            `label.slots` for all the slots
          </Typography>
          <Typography variant="h6" gutterBottom>
            `label.selected_slots` for selected options
          </Typography>
          <div><UploadFiles handleFileUpload={handleFileUpload} /></div>
        </div>}


      <NspFileCard questionFile={questionFile} answerFile={answerFile} labelFile={labelFile} slotsFile={slotsFile} selectedSlotsFile={selectedSlotsFile} />
    </div>
  );
};


export default NspApp;
