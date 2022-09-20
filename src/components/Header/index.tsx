import {
  Title, 
  Header,
} from "./styles";

type HeaderProps = {
    title: string
}

export function HeaderComponent({title}: HeaderProps) {
  return (
        <Header>
          <Title>{title}</Title>
        </Header>
  );
}
