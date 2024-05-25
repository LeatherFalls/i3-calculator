import { TextField } from "@mui/material";
import { ChangeEvent } from "preact/compat";

interface ScoreFormProps {
  label: string;
  value: number | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ScoreForm: React.FC<ScoreFormProps> = ({ label, value, onChange }) => (
  <TextField
    margin="normal"
    fullWidth
    label={label}
    type="number"
    value={value !== null ? value : ''}
    onChange={onChange}
  />
);