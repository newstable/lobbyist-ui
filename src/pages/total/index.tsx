import Proposals from "./proposals";
import Protocols from "./protocols";
import { useNavigate, useParams } from "react-router-dom";

const All = () => {
    let { id } = useParams();
    return (
        <>
            {id == "protocols" ? <Protocols /> : id == "proposal" ? <Proposals /> : ""}
        </>
    )
}

export default All;