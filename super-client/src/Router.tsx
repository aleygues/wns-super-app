import { useQuery } from '@apollo/client';
import { Redirect, Route } from 'react-router';
import { BrowserRouter } from "react-router-dom";
import DashboardScreen, { GET_PROFILE } from './screens/Dashboard';
import HomeScreen from './screens/Home';
import SigninScreen from './screens/Signin';
import SignupScreen from './screens/Signup';

function Router(): JSX.Element {
    const { data, loading, error } = useQuery(GET_PROFILE);

    return (
        <BrowserRouter>
            <Redirect exact path="/" to={data ? '/dashboard' : '/home'} />
            <Route exact path="/signin">
                <SigninScreen></SigninScreen>
            </Route>
            <Route exact path="/signup">
                <SignupScreen></SignupScreen>
            </Route>
            <Route exact path="/dashboard">
                <DashboardScreen></DashboardScreen>
            </Route>
            <Route exact path="/home">
                <HomeScreen></HomeScreen>
            </Route>
        </BrowserRouter>
    );
}

export default Router;