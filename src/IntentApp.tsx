import { useState } from 'react';
import { UploadFiles } from './UploadFiles';
import { FileCard } from './FileCard';
import { Typography } from '@mui/material';

const IntentApp = () => {

  const [inputFile, setInputFile] = useState<string>();
  const [outputFile, setOutputFile] = useState<string>();
  const [labelFile, setLabelFile] = useState<string>();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files === null) return;

    Array.from(files).map((f) => {
      console.log(f);
      if (f.name === 'seq.in') {
        const reader = new FileReader();

        reader.onload = function (e) {
          const content = e.target?.result as string;
          content && setInputFile(content);
        };

        reader.readAsText(f);
      } else if (f.name === 'seq.out') {
        const reader = new FileReader();

        reader.onload = function (e) {
          const content = e.target?.result as string;
          content && setOutputFile(content);
        };

        reader.readAsText(f);
      } else if (f.name === 'label') {
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
    <>
      {(labelFile === undefined) &&
        <div className='h-full flex flex-col justify-center'>
          <Typography variant='h5' >Upload your data files</Typography>
          <Typography variant="body1" gutterBottom>
            `seq.in` for raw inputs
          </Typography>
          <Typography variant="body1" gutterBottom>
            `seq.out` for slot outputs
          </Typography>
          <Typography variant="body1" gutterBottom>
            `label` for labels
          </Typography>
          <div><UploadFiles handleFileUpload={handleFileUpload} /></div>
        </div>}


      <FileCard inputFile={inputFile} labelFile={labelFile} outputFile={outputFile} />
    </>
  );
};


export default IntentApp;
