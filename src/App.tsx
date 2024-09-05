import { useState } from 'react';
import './App.css';
import { UploadFiles } from './UploadFiles';
import { FileCard } from './FileCard';

const App = () => {

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
      <UploadFiles handleFileUpload={handleFileUpload} />

      <FileCard inputFile={inputFile} labelFile={labelFile} outputFile={outputFile} />
    </>
  );
};


export default App;
