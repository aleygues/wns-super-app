import { useHistory } from "react-router";

function HomeScreen(): JSX.Element {
    const { push } = useHistory();

    return (
        <>
            <h1>Home screen !!</h1>
            <button onClick={() => {
                push('/signin');
            }}>Connexion</button>
            <button onClick={() => {
                push('/signup');
            }}>Inscription</button>
        </>
    );
}

export default HomeScreen;