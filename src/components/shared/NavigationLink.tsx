import { Link } from "react-router-dom";

type Props = {
  to: string;
  background: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

function NavigationLink(props: Props) {
  return (
    <Link
      to={props.to}
      onClick={props.onClick}
      className="nav-link"
      style={{
        background: props.background,
        color: props.textColor,
        
      }}
    >
      {props.text}
    </Link>
  );
}

export default NavigationLink;
