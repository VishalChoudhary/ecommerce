import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => navigate("/"), 3000); // Redirect to home after 3 sec
    }, [navigate]);

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <button style={{ border: "none", backgroundColor: "green", borderRadius: "20px", padding: "20px", color: "white", fontSize: "25px", fontWeight: 500, marginBottom: "10px" }}>
                ✅ Payment Successful!
            </button>
            <div style={{ textAlign: "center", fontSize: "15px" }}>
                Your order has been placed.<br />
                Thanks for shopping with us!
            </div>
        </div>
    );
};

export default Success;