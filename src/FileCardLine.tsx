import { Button, Input, Snackbar, SnackbarCloseReason } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SearchIcon from '@mui/icons-material/Search';
import React from "react";

interface IFileCardLineProps {
  label: string;
  inputs: string[],
  outputs: string[];
}

const handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
  const element = event.target as HTMLDivElement;
  if (element) {
    const id: string = element.id;
    if (id.startsWith('label')) {
      const labelId = id.replace('label', 'slot');
      document.getElementById(labelId)?.parentElement?.classList.add('bg-[#1976d2]', '!text-white');
    } else if (id.startsWith('slot')) {
      const slotId = id.replace('slot', 'label');
      document.getElementById(slotId)?.parentElement?.classList.add('bg-[#1976d2]', '!text-white');
    };;
  }
};

const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
  const element = event.target as HTMLDivElement;
  if (element) {
    const id: string = element.id;
    if (id.startsWith('label')) {
      const labelId = id.replace('label', 'slot');
      document.getElementById(labelId)?.parentElement?.classList.remove('bg-[#1976d2]', '!text-white');
    } else if (id.startsWith('slot')) {
      const slotId = id.replace('slot', 'label');
      document.getElementById(slotId)?.parentElement?.classList.remove('bg-[#1976d2]', '!text-white');
    };;
  }

};

const handlePredictSlots = async (idx: number) => {
  const inputId = `input-${idx}`;
  const input = Array.from(document.getElementById(inputId)?.querySelectorAll('input') || []).map((s) => s.value).join(' ');

  const res = await fetch('http://localhost:3080/api/v1/slots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "input": input })
  });

  const predictRes = await res.json();
  const predictSlots = predictRes['slots'];

  const slotId = `slot-${idx}`;
  Array.from(document.getElementById(slotId)?.querySelectorAll('input') || []).map((s, i) => {
    s.value = predictSlots[i];
  });

};



const FileCardInputOutput: React.FC<{ input: string, idx: number; label: string; output: string; onCopyWords: (idx: number) => void; onCopySlots: (slotIdx: number) => void; }> = ({ input, idx, label, output, onCopySlots, onCopyWords }) => {
  const words = input.split(/\s/);
  let slots: string[];
  if (output) {
    slots = output.split(/\s/);
  } else {
    slots = words.map(() => 'O');
  }

  return (
    <div className="m-2 p-2 hover:bg-gray-200">
      <div id={`input-${idx}`}>
        {words.map((w, sidx) => <Input key={`${label}-${idx}-${sidx}`} id={`label-${idx}-${sidx}`} defaultValue={w} onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} className="hover:bg-[#1976d2] hover:text-white" />)}
        <ContentCopyIcon className="m-2 cursor-pointer" onClick={() => onCopyWords(idx)} />
        <SearchIcon className="m-2 cursor-pointer" onClick={() => handlePredictSlots(idx)} />
      </div>

      <div id={`slot-${idx}`}>
        {slots.map((s, sidx) => <Input key={`${label}-slot-${idx}-${sidx}`} id={`slot-${idx}-${sidx}`} defaultValue={s} className="hover:bg-[#1976d2] hover:text-white" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} />)}
        <ContentCopyIcon className="m-2 cursor-pointer" onClick={() => onCopySlots(idx)} />
      </div>
    </div>
  );
};

export const FileCardLine: React.FC<IFileCardLineProps> = ({ label, inputs, outputs }) => {
  const [saving, setSaving] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  const copyWords = async (inputIdx: number) => {
    setMessage("Copying");
    setSaving(true);

    const inputId = `input-${inputIdx}`;
    const inputs = Array.from(document.getElementById(inputId)?.querySelectorAll('input') || []).map((s) => s.value).join(' ');
    await navigator.clipboard.writeText(inputs);

    setMessage("Copied");
    setTimeout(() => setSaving(false), 1000);
  };

  const copySlots = async (slotIdx: number) => {
    setMessage("Copying");
    setSaving(true);

    const slotId = `slot-${slotIdx}`;
    const slots = Array.from(document.getElementById(slotId)?.querySelectorAll('input') || []).map((s) => s.value).join(' ');
    await navigator.clipboard.writeText(slots);

    setMessage("Copied");
    setTimeout(() => setSaving(false), 1000);
  };

  const copyAllSlots = async () => {
    setMessage("Copying");
    setSaving(true);

    const inputsLength = inputs.length;
    let slotsList: string[] = [];

    for (let i of [...Array(inputsLength).keys()]) {
      const slotId = `slot-${i}`;
      const slots = Array.from(document.getElementById(slotId)?.querySelectorAll('input') || []).map((s) => s.value).join(' ');
      slotsList.push(slots);
    }

    await navigator.clipboard.writeText(slotsList.join("\n"));

    setMessage("Copied");
    setTimeout(() => setSaving(false), 1000);
  };

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSaving(false);
  };



  return (
    <>
      {
        inputs.map((l, idx) => <FileCardInputOutput key={idx} input={l} idx={idx} label={label} output={outputs[idx]} onCopySlots={copySlots} onCopyWords={copyWords} />)
      }

      {
        inputs?.length > 0 && <Button component="div" variant="contained" tabIndex={-1} onClick={copyAllSlots}>Copy All</Button>
      }

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={saving}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
    </>
  );
};
