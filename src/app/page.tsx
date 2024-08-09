"use client";
import Styles from "@/app/Socialmedia.module.css";
import Carsds from "@/components/cards/Carsds";
import { useSession } from "next-auth/react";
import React, { useState } from 'react';

interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
}

const SocialMedia: React.FC = () => {

  const [characters, setCharacters] = useState<Character[]>([]);

  const mostrar = async (eve: React.MouseEvent<HTMLButtonElement>) => {
    const value = eve.currentTarget.value;
    const res = await fetch(`https://rickandmortyapi.com/api/character/?status=${value}`);
    const data = await res.json();
    const info = data.results;

    setCharacters(info);
  };

  const { data: sesion } = useSession()


  return (


    <div>
      {sesion?.user ? (<div className={Styles.socialmedia}>
        <div className={Styles.estado}>Estados</div>
        <div className={Styles.contenedor}>
          <button className={Styles.oauthButton} value="Alive" onClick={mostrar}>Alive</button>
          <button className={Styles.oauthButton} value="Dead" onClick={mostrar}>Dead</button>
          <button className={Styles.oauthButton} value="unknown" onClick={mostrar}>unknown</button>
        </div>
        <hr />

        <div className={Styles.contenedorcartas} id='mostrar'>
          {characters.map((character) => (
            <Carsds
              key={character.id}
              id={character.id}
              nombre={character.name}
              estado={character.status}
              foto={character.image}
            />
          ))}
        </div>
      </div>) : ""}

    </div>
  );
};

export default SocialMedia;
