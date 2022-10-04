import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useNavigate, useParams } from "react-router-dom";
import { CustomTabs as Tabs } from "../../components";
import ActiveProposals from "./active";
import { Link } from "react-router-dom";
import symbols from "./symbols.json";

type Props = {};

const tabs: string[] = ["Proposals", "History"];

const ProposalSymbol = (props: Props) => {
  const navigate = useNavigate();
  let { symbol } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    var mysymbol = symbols.filter((s) => s === symbol);
    if (mysymbol.length === 0) {
      navigate("/");
    }
  })
  const paramSymbol = symbol ?? "";

  return (
    <Box className="main-body flex flex-col grow">
      <Box className="flex flex-col min-h-full main-content gap-14">
        <Box className="flex justify-between">
          <Tabs tabIndex={tabIndex} tabs={tabs} setTabIndex={setTabIndex} />
          <Link to={`/proposal/new/${symbol}`}>
            <Button
              variant="contained"
              color="tealLight"
              className="h-16"
              startIcon={<ControlPointIcon />}
            >
              Create Proposal
            </Button>
          </Link>
        </Box>
        {tabIndex === 0 ? (
          <ActiveProposals symbol={paramSymbol} isHistory={false} />
        ) :
          (
            <ActiveProposals symbol={paramSymbol} isHistory={true} />
          )}
      </Box>
    </Box>
  );
};

export default ProposalSymbol;
