import react from 'react';
import { render, screen} from '@testing-library/react-native'
import { ThemeProvider } from "styled-components/native";
import theme from "../../../global/styles/theme";

import { Input } from '.';

interface ProviderProps {
  children: react.ReactNode;
}

function Provider({ children }: ProviderProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

describe('Input form', () => {
  it('Input should have border red and width 3px', async () => {
   render(
    <Input 
      testID='inputForm'
      placeholder="Input form"
      active
    />,{wrapper: Provider})

    const input = screen.getByTestId('inputForm');
    const inputActive =  input.props.style[0];
    
    expect(inputActive.borderWidth).toBe(3)
    expect(inputActive.borderColor).toBe(theme.colors.attention)
  })

  it('Input should not have border and color red', () => {
    const { getByTestId } = render(<Input 
        testID='inputForm'
        placeholder="Input form"
      />,{wrapper: Provider})

    const input = getByTestId('inputForm');
    const inputInactive = input.props.style[0];

    expect(inputInactive.border).toBeFalsy();
    expect(inputInactive.borderColor).toBeFalsy();

  })
})