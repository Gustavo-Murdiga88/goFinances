import react,{FC} from "react";
import { TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";

import {Container, ImageContainer, Title} from './styles';

interface SignInSocialButtonProps extends TouchableOpacityProps{
    svg:FC<SvgProps>;
    title: string;
}

export function SignInSocialButton({title, svg:Svg, ...props}: SignInSocialButtonProps ){
    return(
        <Container activeOpacity={0.9} {...props}>
            <ImageContainer>
            <Svg />
            </ImageContainer>
            <Title>
                {title}
            </Title>
        </Container>
    )
}