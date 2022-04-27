import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const SIGNIN = gql`
    mutation signin($email: String!, $password: String!) {
        signin(email: $email, password: $password)
    }
`;

function SigninScreen(): JSX.Element {
    const { replace } = useHistory();
    const [email, setEmail] = useState('email1637854629639@gmail.com');
    const [password, setPassword] = useState('supersecret');
    const [failed, setFailed] = useState(false);
    const [doSignin, { data, loading, error }] = useMutation(SIGNIN);
    
    const onSubmit = async () => {
        setFailed(false);
        const result = await doSignin({
            variables: {
                email: email,
                password: password
            }
        });
        if (result.data.signin) {
            // success
            localStorage.setItem('token', result.data.signin);
            replace('/dashboard');
        } else {
            // failed
            setFailed(true);
        }
    };

    return (
        <>
            <h1>Login</h1>
            Email : <input type="text" value={email} onChange={e => setEmail(e.target.value)} /><br />
            Password : <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
            <button onClick={onSubmit} disabled={loading === true}>Connexion</button>
            {error && <p>Error</p>}
            {failed && <p>You failed</p>}
        </>
    );
}

export default SigninScreen;