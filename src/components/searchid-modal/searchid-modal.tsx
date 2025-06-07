import React from 'react';
import type { AnimalData } from '../../interface/AnimalData';
import './searchid-modal.css';

interface SearchIdModalProps {
    animal: AnimalData;
    closeModal: () => void;
}

export function SearchIdModal({ animal, closeModal }: SearchIdModalProps) {
    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <button className="close-btn" onClick={closeModal} title="Fechar">FECHAR</button>
                <h2>Animal Encontrado</h2>
                <img src={animal.imagem} alt={animal.nome} style={{width: '100%', borderRadius: '12px', marginBottom: '16px'}} />
                <p><b>Nome:</b> {animal.nome}</p>
                <p><b>Tipo:</b> {animal.tipo}</p>
                <p><b>Idade:</b> {animal.idade}</p>
                <p><b>Raça:</b> {animal.raca}</p>
                <p><b>Status de adoção:</b> {animal.statusadocao}</p>
                <p><b>Descrição:</b> {animal.descr}</p>
            </div>
        </div>
    );
}