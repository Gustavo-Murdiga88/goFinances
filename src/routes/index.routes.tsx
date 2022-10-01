import { NavigationContainer } from '@react-navigation/native';
import { useAuthContext } from '../context/Auth';
import { PublicRoute } from './auth.routes';
import { AppRoutes } from './app.routes';

export function Routes(){
    const { user } = useAuthContext();
    return(
        <NavigationContainer>
            { user.id ?  <AppRoutes /> : <PublicRoute />}
        </NavigationContainer>
    )
}