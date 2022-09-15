import React from "react";
import { useTheme } from "styled-components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Dashboard } from "../screens/Dashbaord";
import { Register } from "../screens/Register";

import { Feather } from "@expo/vector-icons"; 

const Icons = {
    pie: 'pie-chart',
    dolar: 'dollar-sign',
    menu: 'menu',
} as const;

export function Routes() {
  const { Navigator, Screen } = createBottomTabNavigator();
  const theme = useTheme();

  return (
    <Navigator
     screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
            height: 60,
        },
        tabBarIcon: ({size, color}) => {
            switch(route.name){
                case 'Listagem':{
                    return <Feather name={Icons.menu} size={size} color={color} />
                }
                case 'Cadastrar':{
                    return <Feather name={Icons.dolar} size={size} color={color} />
                }

                case "Resumo":{
                    return <Feather name={Icons.pie } size={size} color={color} />
                }

                default:{ return }
            }
        }
 
     })}
    >
      <Screen name="Listagem" component={Dashboard} />
      <Screen name="Cadastrar" component={Register} />
      <Screen name="Resumo" component={Register} />
    </Navigator>
  );
}
