import { createStackNavigator } from '@react-navigation/stack';
import { SingIn } from "../../src/screens/SingIn";


const { Navigator, Screen } = createStackNavigator();
export function PublicRoute(){
    return (
        <Navigator screenOptions={{ 
            headerShown: false,
        }}>
            <Screen  name='SingIn' component={SingIn}/>
        </Navigator>
    )
}