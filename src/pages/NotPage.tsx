import { Link } from "react-router-dom";
import "./notpage.scss";
import { Button } from "@mui/material";

const NotPage = () => {
    return (
        <div className="notpage">
            <div className="error">404</div>
            <Link to={"/"}>
                <Button variant="contained"
                    color="tealLight"
                    className="h-16">
                    Go to Home
                </Button>
            </Link>
        </div>
    )
}

export default NotPage;