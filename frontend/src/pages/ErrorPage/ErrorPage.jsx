import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>404</h1>
            <h2>Page does not exist</h2>
            <button onClick={() => navigate("/")}>Go to splash page</button>
        </div>
    )
}