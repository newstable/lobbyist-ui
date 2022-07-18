import { CardHeader } from "@mui/material";
import { styled } from "@mui/material/styles";
import classNames from "classnames";
import { colors } from "../../../common";

type Props = { title: string; isCenter?: boolean; isSolid?: boolean };

const Header = styled(CardHeader)(({ theme }) => ({
  // background: `linear-gradient(90deg, ${colors.teal} 2%, ${colors.tealLight} 96%)`,
  background: "transparent",
}));

const HeaderSolid = styled(CardHeader)(({ theme }) => ({
  background: `linear-gradient(90deg, ${colors.teal} 2%, ${colors.tealLight} 96%)`,
}));

const ProposalCardHeader = ({ title, isCenter, isSolid }: Props) => {
  if (isSolid) {
    return (
      <HeaderSolid
        className={classNames(
          "!px-0 py-2 uppercase",
          isCenter && "text-center"
        )}
        title={title}
        titleTypographyProps={{ variant: "caption" }}
      ></HeaderSolid>
    );
  }
  return (
    <Header
      className={classNames("!px-0 py-2 uppercase", isCenter && "text-center")}
      title={title}
      titleTypographyProps={{ variant: "caption" }}
    ></Header>
  );
};

ProposalCardHeader.defaultProps = {
  isCenter: false,
  isSolid: false,
};

export { ProposalCardHeader };
