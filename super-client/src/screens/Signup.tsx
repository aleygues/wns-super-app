import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router";
import gql from "graphql-tag";

const SIGNUP = gql`
    mutation signup($email: String!, $password: String!) {
        signup(email: $email, password: $password) {
            id
            email
        }
    }
`;

function SignupScreen(): JSX.Element {
    const { replace } = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [doSignUp, { loading, error }] = useMutation(SIGNUP);

    const onSubmit = async () => {
        await doSignUp({
            variables: {
                email: email,
                password: password
            }
        });
        // success
        replace('/');
    };

    return (
        <>
            <h1>Signup</h1>
            Email : <input type="text" value={email} onChange={e => setEmail(e.target.value)} /><br />
            Password : <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
            <button onClick={onSubmit} disabled={loading === true}>Inscription</button>
            {error && <p>Error</p>}
        </>
    );
}

export default SignupScreen;