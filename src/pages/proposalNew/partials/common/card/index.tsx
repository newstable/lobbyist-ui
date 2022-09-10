import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ProposalCardHeader } from "../../../../../components";

type Props = {
  title: string;
  slug?: string;
  isType?: boolean;
  isSolid?: boolean;
};

const Content = styled(CardContent)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const ProposalNewCard = ({ title, slug, isType, isSolid }: Props) => {
  const navigate = useNavigate();

  const onClickNavigate = () => {
    slug && navigate(slug);
  };
  return (
    <Card className="cursor-pointer" onClick={onClickNavigate}>
      {isType ? (
        <Content className="h-60 flex items-center justify-center">
          <Typography variant="caption">{title}</Typography>
          {title == "Variable" ? (
            <div style={{ color: "#99ff3c" }}>&nbsp;Coming soon</div>
          ) : ""}
        </Content>
      ) : (
        <>
          <ProposalCardHeader title={title} isCenter isSolid={isSolid} />
          <Content className="h-60"></Content>
        </>
      )}
    </Card>
  );
};

ProposalNewCard.defaultProps = {
  title: "",
  isType: false,
  isSolid: false,
};

export { ProposalNewCard };
