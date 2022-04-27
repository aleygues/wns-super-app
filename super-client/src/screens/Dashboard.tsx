import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useHistory } from "react-router";

export const GET_PROFILE = gql`
    query getProfile {
        getProfile {
            id
            email
        }
    }
`;

function DashboardScreen(): JSX.Element {
    const { replace } = useHistory();
    const { data, loading, error } = useQuery(GET_PROFILE);

    const onSignOut = () => {
        localStorage.removeItem('token');
        replace('/');
    }

    return (
        <>
            <h1>Dashboard</h1>
            {error && <p>Error</p>}
            {data && <div>
                <p>Hello {data.getProfile.email}</p>
                <button onClick={onSignOut}>Sign out</button>
            </div>}
        </>
    );
}

export default DashboardScreen;