import React from 'react';
import type { AnimalData } from '../interface/AnimalData';
import "./card.css";

interface CardProps extends AnimalData {
    onEdit: (animal: AnimalData) => void; // Função para edição
    onDelete: (id: any) => void; // Função para exclusão
}

export function Card({
    id,
    nome,
    imagem,
    tipo,
    idade,
    raca,
    statusadocao,
    descr,
    onEdit, // Recebe a função de edição como prop
    onDelete,
}: CardProps) {
    return (
        <div className="card">
            <h2>{nome}</h2>
            <img src={imagem} alt={nome} />
            <p><b>Tipo:</b> {tipo}</p>
            <p><b>Idade:</b> {idade}</p>
            <p><b>Raça:</b> {raca}</p>
            <p><b>Status de adoção:</b> {statusadocao}</p>
            <p className="card-descr"><b>Descrição:</b><br /> {descr}</p>
            <button onClick={() => onEdit({ id, nome, imagem, tipo, idade, raca, statusadocao, descr })}>Atualizar</button>

            <button onClick={() => onDelete(id)}>Excluir</button>
        </div>
    );
}
