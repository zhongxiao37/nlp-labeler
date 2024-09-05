import { Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export const UploadFiles: React.FC<{ handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ handleFileUpload }) => {


  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <input
        type="file"
        onChange={(event) => handleFileUpload(event)}
        multiple
        style={{
          clip: 'rect(0 0 0 0)',
          clipPath: 'inset(50%)',
          height: 1,
          overflow: 'hidden',
          position: 'absolute',
          bottom: 0,
          left: 0,
          whiteSpace: 'nowrap',
          width: 1,
        }}
      />
    </Button>
  );
};