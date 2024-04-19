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
      }}
      margin="normal"
      name={props.name}
      label={props.label}
      type={props.type}
      autoComplete="on"
      sx={{
        width: {
          xs: "280px",
          sm: "500px",
          md: "600px",
        },
        fontSize: {
          xs: "15px",
          md: "18px"
        }
      }}
    />
  );
}

export default CustomizedInput;
