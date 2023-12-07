import axios from "axios";
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const newRegister = () => {
        axios
            .post("http://localhost:3000/admin/signup", {
                username: email,
                password: password,
            })
            .then(() => {
                setEmail("");
                setPassword("");
                window.location.href = "/courses";
            });
    };

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "#eeeeee",
                paddingTop: "20vh",
            }}
        >
            <center>
                <Typography variant="h5">
                    Welcome to COURZERO! Sign up here.
                </Typography>
                <br />
                <Card variant="outlined" style={{ width: 400, padding: "2%" }}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        type={"text"}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type={"text"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <br />
                    <Button variant="contained" onClick={newRegister}>
                        Register
                    </Button>
                    <br />
                    <br />
                    <Typography fontSize={"caption"} variant="h6">
                        Already a user? <a href="/login">Login</a>
                    </Typography>
                </Card>
            </center>
        </div>
    );
}

export default Register;
