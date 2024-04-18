import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {User} from "./client";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER"
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/Kanbas/Account/Profile");
  };
  return (
      <div className="d-block form-control">
        <h1>Sign in</h1>
        <input className="form-control" value={credentials.username} onChange={(e) =>
            setCredentials({...credentials, username: e.target.value})}/>
        <br/>
        <input type="password" className="form-control" value={credentials.password} onChange={(e) =>
            setCredentials({...credentials, password: e.target.value})}/>
        <br/>
        <button onClick={signin} className="btn btn-primary"> Sign in</button>
        <Link to="/Kanbas/Account/Signup"
                    className="btn btn-warning w-20">
                Sign up
              </Link>
      </div>
  );
}
