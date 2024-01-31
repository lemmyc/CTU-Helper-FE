import { TextField } from "@mui/material";
type Props = {
  name: string;
  type: string;

  label: string;
};

function CustomizedInput(props: Props) {
  return (
    <TextField
      InputLabelProps={{

      }}

      InputProps={{
        style:{
            width: "400px",
        }
      }}
      margin="normal"
      name={props.name}
      label={props.label}
      type={props.type}
    />
  );
}

export default CustomizedInput;
