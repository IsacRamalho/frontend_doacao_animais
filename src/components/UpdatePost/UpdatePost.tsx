// src/components/update-modal.js
import React, { useState, useEffect } from 'react';
import type { AnimalData } from '../../interface/AnimalData';
import './update.css';
import { useAnimalDataMutate } from '../../hooks/useAnimalDataMutate';

interface UpdatePostProps {
    closeModal: () => void;
    animal: AnimalData | null; // Recebe o animal a ser editado
}

const Input = ({ label, value, updateValue }: { label: string; value: string | number; updateValue: (value: any) => void; }) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)} />
        </>
    );
};

export function UpdatePost({ closeModal, animal }: UpdatePostProps) {
    const [nome, setNome] = useState('');
    const [imagem, setImagem] = useState('');
    const [tipo, setTipo] = useState('');
    const [idade, setIdade] = useState(0);
    const [raca, setRaca] = useState('');
    const [statusadocao, setStatusAdocao] = useState('');
    const [descr, setDescr] = useState('');
    
    useEffect(() => {
        if (animal) {
            setNome(animal.nome);
            setImagem(animal.imagem);
            setTipo(animal.tipo);
            setIdade(animal.idade);
            setRaca(animal.raca);
            setStatusAdocao(animal.statusadocao);
            setDescr(animal.descr);
        }
    }, [animal]);

const { updateMutation } = useAnimalDataMutate();

useEffect(() => {
    if (updateMutation.isSuccess) {
        closeModal();
    }
}, [updateMutation.isSuccess, closeModal]);

const submit = () => {
    const updatedAnimal: AnimalData = {
        id: animal?.id,
        nome,
        imagem,
        tipo,
        idade,
        raca,
        statusadocao,
        descr,
    };
    updateMutation.mutate(updatedAnimal);
};

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Atualizar Animal</h2>
                <form onSubmit={e => { e.preventDefault(); submit(); }}>
                    <Input label="Nome: " value={nome} updateValue={setNome} />
                    <Input label="Imagem: " value={imagem} updateValue={setImagem} />
                    <Input label="Tipo: " value={tipo} updateValue={setTipo} />
                    <Input label="Idade: " value={idade} updateValue={setIdade} />
                    <Input label="Raça: " value={raca} updateValue={setRaca} />
                    <Input label="Status de adoção: " value={statusadocao} updateValue={setStatusAdocao} />
                    <Input label="Descrição: " value={descr} updateValue={setDescr} />
                    <button type="submit">Salvar</button>
                </form>
                <button onClick={closeModal}>Cancelar</button>
            </div>
        </div>
    );
}