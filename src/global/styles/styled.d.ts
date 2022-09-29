import 'styled-components/native';
import theme from './theme';

type defaultTheme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends defaultTheme {}
}
