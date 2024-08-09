import React, { useState } from 'react';
import Style from "@/components/cards/styles.module.css";

interface CardProps {
  id: number;
  nombre: string;
  estado: string;
  foto: string;
}
const Carsds: React.FC<CardProps> = ({ id, nombre, estado, foto }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infomodal, setInfomodal] = useState({
    nombre: "",
    origen: { name: "" },
    especie: "",
    genero: ""
  })




  const handleOpenModal = async (eve: React.MouseEvent<HTMLButtonElement>) => {
    const consulta = eve.currentTarget.value
    const res = await fetch(`https://rickandmortyapi.com/api/character/${consulta}`);
    const data = await res.json();

    setInfomodal({
      nombre: data.name,
      origen: { name: data.origin.name },
      especie: data.species,
      genero: data.gender
    })

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  return (
    <>
      <div className={Style.contenedorcarta}>
        <img className={Style.foto} src={foto} />
        <div className={Style.nombre}>{nombre}</div>
        <div className={Style.estado}>{estado}</div>

        <div className={Style.btn}>
          <button className={Style.vermas} onClick={handleOpenModal} value={id}>Ver más</button>
        </div>
        {isModalOpen && (
          <div className={Style.modalOverlay}>
            <div className={Style.modalContent}>
              <p>Especie:{infomodal.especie}</p>
              <p>Origen:{infomodal.origen.name}</p>
              <p>Genero: {infomodal.genero}</p>
              <button className={Style.vermas} onClick={handleCloseModal}>Cerrar</button>
            </div>
          </div>
        )}
      </div >


    </>
  );
}

export default Carsds;
