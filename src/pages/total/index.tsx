import Proposals from "./proposals";
import Protocols from "./protocols";
import Analytics from "./analytics";
import { useNavigate, useParams } from "react-router-dom";

const All = () => {
    let { id } = useParams();
    return (
        <>
            {id == "protocols" ? <Protocols /> : id == "proposal" ? <Proposals /> : id == "analytics" ? <Analytics /> : ""}
        </>
    )
}

export default All;