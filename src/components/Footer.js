import styled from "@emotion/styled";
import { useState } from "react";
import { useHistory } from "react-router";
import usePokemon from "../hooks/usePokemon";
import { Wrapper, Button as ButtonBase } from "./Utilities";

const Container = styled(Wrapper)`
  position: fixed;
  bottom: 0;
  width: 100%;
  justify-content: space-around;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.2);
  z-index: 3;
`;

const Button = styled(ButtonBase)`
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: ${(props) => (props.active ? "#E14B4B" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border-radius: ${(props) => (props.active ? "0px" : "10px")};
  font-size: 1em;
  font-weight: 700;
`;

const Footer = () => {
  const { rememberLastPageVisited, getLastVisitedPage } = usePokemon();
  let history = useHistory();
  const [active, setActive] = useState({
    pokedex: !getLastVisitedPage().onMyPokemonList,
    mypokemon: getLastVisitedPage().onMyPokemonList,
  });

  const handleClickPokeDex = () => {
    setActive({ pokedex: true, mypokemon: false });
    rememberLastPageVisited(false);
    console.log(getLastVisitedPage());
    history.push("/");
  };

  const handleClickMyPokemon = () => {
    setActive({ mypokemon: true, pokedex: false });
    rememberLastPageVisited(true);
    history.push("/mypokemon");
  };

  return (
    <Container>
      <Button active={active.pokedex} onClick={handleClickPokeDex}>
        PokeDex
      </Button>
      <Button active={active.mypokemon} onClick={handleClickMyPokemon}>
        My Pokemon
      </Button>
    </Container>
  );
};

export default Footer;