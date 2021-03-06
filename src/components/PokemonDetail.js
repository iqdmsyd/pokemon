import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POKE } from "../graphql/Queries";
import styled from "@emotion/styled";
import { Text, Wrapper } from "./Utilities";
import CardDetail from "./CardDetail";
import { Loading, ErrorMessage } from "./Utilities";
import usePokemon from "../hooks/usePokemon";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #8ebc8d;

  animation-name: slidedown;
  animation-duration: 0.3s;

  @keyframes slidedown {
    from {
      transform: translateY(-100%);
      transition: all 0.3s 0.3s ease-in-out;
    }
    to {
      transform: translateY(0%);
    }
  }
`;

const TextWrapper = styled(Wrapper)`
  justify-content: space-between;
  padding: 20px;
`;

const Avatar = styled.img`
  position: relative;
  margin-bottom: -20px;
  width: 240px;
  height: 240px;
  align-self: center;
  z-index: 2;
`;

const PokemonDetail = ({ handleCloseDetail }) => {
  const { getCurrentPokemon } = usePokemon();
  const { error, loading, data } = useQuery(GET_POKE, {
    variables: { name: getCurrentPokemon().name },
  });

  if (loading) return <Loading>Loading...</Loading>;
  if (error) return <ErrorMessage>Error!</ErrorMessage>;

  const pokemon = data.pokemon;
  const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const pokeNumber = `#${(pokemon.id < 10 ? "0" : "") + pokemon.id.toString()}`;

  return (
    <Container>
      <TextWrapper>
        <Text LargeText Black>
          {pokeName}
        </Text>
        <Text MediumText SemiBold Italic>
          {pokeNumber}
        </Text>
      </TextWrapper>
      <Avatar src={getCurrentPokemon().image} alt={getCurrentPokemon().name} />
      <CardDetail pokemon={pokemon} handleCloseDetail={handleCloseDetail} />
    </Container>
  );
};

export default PokemonDetail;
