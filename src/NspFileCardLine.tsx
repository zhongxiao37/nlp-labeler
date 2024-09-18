import { Input, Snackbar, Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SearchIcon from '@mui/icons-material/Search';
import React from "react";
import { PAGE_SIZE } from "./NspFileCard";

interface INspFileCardLineProps {
  inputs: string[];
  labels: string[];
  slots: string[];
  selectedSlots: string[];
  page: number;
}

interface INspFileCardInputOutputProps {
  input: string;
  idx: number;
  label: string;
  output: string;
  outputSelected: string;
  onCopyWords: (idx: number) => void;
  onCopySlots: (slotIdx: number) => void;
  onCopySelectedSlots: (slotIdx: number) => void;
}

const handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
  const element = event.target as HTMLDivElement;
  if (element) {
    const id: string = element.id;
    if (id.startsWith('label')) {
      const slotId = id.replace('label', 'slot');
      const slotSelectedId = id.replace('label', 'slot-selected');
      document.getElementById(slotId)?.parentElement?.classList.add('bg-[#1976d2]', '!text-white');
      document.getElementById(slotSelectedId)?.parentElement?.classList.add('bg-[#1976d2]', '!text-white');
    } else if (id.startsWith('slot')) {
      const labelId = id.replace('slot-selected', 'label').replace('slot', 'label');
      document.getElementById(labelId)?.parentElement?.classList.add('bg-[#1976d2]', '!text-white');
    };;
  }
};

const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
  const element = event.target as HTMLDivElement;
  if (element) {
    const id: string = element.id;
    if (id.startsWith('label')) {
      const slotId = id.replace('label', 'slot');
      const slotSelectedId = id.replace('label', 'slot-selected');
      document.getElementById(slotId)?.parentElement?.classList.remove('bg-[#1976d2]', '!text-white');
      document.getElementById(slotSelectedId)?.parentElement?.classList.remove('bg-[#1976d2]', '!text-white');
    } else if (id.startsWith('slot')) {
      const labelId = id.replace('slot-selected', 'label').replace('slot', 'label');
      document.getElementById(labelId)?.parentElement?.classList.remove('bg-[#1976d2]', '!text-white');
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



const NspFileCardInputOutput: React.FC<INspFileCardInputOutputProps> = ({ input, idx, label, output, outputSelected, onCopySlots, onCopyWords, onCopySelectedSlots }) => {
  const words = input.split(/\s/);
  let slots: string[];
  if (output) {
    slots = output.split(/\s/);
  } else {
    slots = words.map(() => 'O');
  }

  let selectedSlots: string[];

  if (outputSelected) {
    selectedSlots = outputSelected.split(/\s/);
  } else {
    selectedSlots = words.map(() => 'O');
  }

  const labelColor = label === '1' ? 'hover:bg-blue-200 bg-blue-300' : 'hover:bg-gray-200';
  const divColor = `m-2 p-2 ${labelColor}`;

  return (
    <div className={divColor}>
      <Typography>{idx + 1}</Typography>
      <div id={`input-${idx}`}>
        {words.map((w, sidx) => <Input key={`${idx}-${sidx}`} id={`label-${idx}-${sidx}`} defaultValue={w} onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} className="hover:bg-[#1976d2] hover:text-white" />)}
        <ContentCopyIcon className="m-2 cursor-pointer" onClick={() => onCopyWords(idx)} />
        <SearchIcon className="m-2 cursor-pointer" onClick={() => handlePredictSlots(idx)} />
      </div>

      <div id={`slot-${idx}`}>
        {slots.map((s, sidx) => <Input key={`slot-${idx}-${sidx}`} id={`slot-${idx}-${sidx}`} defaultValue={s} className="hover:bg-[#1976d2] hover:text-white" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} />)}
        <ContentCopyIcon className="m-2 cursor-pointer" onClick={() => onCopySlots(idx)} />
      </div>

      <div id={`slot-selected-${idx}`}>
        {selectedSlots.map((s, sidx) => <Input key={`slot-selected-${idx}-${sidx}`} id={`slot-selected-${idx}-${sidx}`} defaultValue={s} className="hover:bg-[#1976d2] hover:text-white" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} />)}
        <ContentCopyIcon className="m-2 cursor-pointer" onClick={() => onCopySelectedSlots(idx)} />
      </div>
    </div>
  );
};

export const NspFileCardLine: React.FC<INspFileCardLineProps> = ({ inputs, labels, slots, selectedSlots, page }) => {
  const [saving, setSaving] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  console.log('labels', labels);
  console.log('slots', slots);

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
    const s = Array.from(document.getElementById(slotId)?.querySelectorAll('input') || []).map((s) => s.value).join(' ');
    await navigator.clipboard.writeText(s);

    setMessage("Copied");
    setTimeout(() => setSaving(false), 1000);
  };

  const copySelectedSlots = async (slotIdx: number) => {
    setMessage("Copying");
    setSaving(true);

    const slotId = `slot-selected-${slotIdx}`;
    console.log(slotId);
    const ss = Array.from(document.getElementById(slotId)?.querySelectorAll('input') || []).map((s) => s.value).join(' ');
    await navigator.clipboard.writeText(ss);

    setMessage("Copied");
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <>
      {
        inputs.map((l, i) => {
          const idx = i + (page - 1) * PAGE_SIZE;
          return <NspFileCardInputOutput key={idx} input={l} idx={idx} label={labels[i]} output={slots[i]} outputSelected={selectedSlots[i]} onCopySlots={copySlots} onCopySelectedSlots={copySelectedSlots} onCopyWords={copyWords} />;
        }
        )
      }

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={saving}
        autoHideDuration={6000}
        message={message}
      />
    </>
  );
};
