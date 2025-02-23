import NavBar from "../NavBar/NavBar";
import { Grid } from "antd";
const { useBreakpoint } = Grid;

export const Header = ({ ...props }) => {
  const screens = useBreakpoint();
  return (
    <div {...props}>
      Header
      {screens.md && <NavBar />}
    </div>
  );
};
