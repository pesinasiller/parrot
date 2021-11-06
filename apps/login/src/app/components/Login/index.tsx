import { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AUTHENTICATED } from '../../actions';
import './Login.scss';

 const loginUser = async (credentials: {username: string, password: string}) => {
 return fetch(`${process.env.NX_BASE_URL}/api/auth/token`, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
  })
  .then(data => data.json());
}

export default function Login({ setToken }: {setToken: (arg0: string, arg1: string) => void}) {
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setErrror] = useState<string>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { authenticated } = useSelector((state: RootStateOrAny) => state);

  if (authenticated) {
    return <Redirect push to="/" />
  }

  const handleSubmit = async () => {

    if(!username || !password) return;

    setErrror('');
    setLoading(true);

    const response = await loginUser({
      username,
      password
    });

    setLoading(false);

    if (response.errors) {
      setErrror(response.errors[0].message);
    } else {
      setToken(response.access, response.refresh);
      dispatch({ type: AUTHENTICATED, payload: JSON.stringify(response.access)});
    }
  }

  return(
    <div className="login-form">
      <div className="login-form__form">
        <h1>PARROT</h1>
        <div>
          <TextField
            label="Username"
            variant="standard"
            onChange={e => setUserName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Password"
            variant="standard"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          {loading
          ? <CircularProgress />
          : <Button
              variant="contained"
              type="submit"
              onClick={handleSubmit}
              color="primary"
              disabled={!username || !password}
            >
              Login
            </Button>
          }
        </div>
        <div className="login-form__error">{error}</div>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
