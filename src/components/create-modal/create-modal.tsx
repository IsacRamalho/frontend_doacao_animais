// src/components/create-modal/create-modal.js
import { useEffect, useState } from 'react';
import { useAnimalDataMutate } from '../../hooks/useAnimalDataMutate';
import type { AnimalData } from '../../interface/AnimalData';
import './modal.css';

interface InputProps {
    label: string;
    value: string | number;
    updateValue: (value: any) => void;
}

interface ModalProps {
    closeModal: () => void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)} />
        </>
    );
};

interface ModalProps {
    closeModal: () => void;
    animal?: AnimalData | null; // Permite receber animal ou null
    isEditMode?: boolean;       // Permite receber modo de edição
}

export function CreateModal({ closeModal, animal = null, isEditMode = false }: ModalProps) {
    const [nome, setNome] = useState(animal?.nome || '');
    const [imagem, setImagem] = useState(animal?.imagem || '');
    const [tipo, setTipo] = useState(animal?.tipo || '');
    const [idade, setIdade] = useState(animal?.idade || 0);
    const [raca, setRaca] = useState(animal?.raca || '');
    const [statusadocao, setStatusAdocao] = useState(animal?.statusadocao || '');
    const [descr, setDescr] = useState(animal?.descr || '');
    const { createMutation } = useAnimalDataMutate();

    const submit = () => {
        const animalData: AnimalData = {
            nome,
            imagem,
            tipo,
            idade,
            raca,
            statusadocao,
            descr,
        };

        createMutation.mutate(animalData);
};

    // Verifica se a mutação foi bem-sucedida e fecha o modal
    useEffect(() => {
        if (createMutation.isSuccess) {
            closeModal();
        }
    }, [createMutation.isSuccess, closeModal]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo animal</h2>
                <form className="input-container" onSubmit={(e) => { e.preventDefault(); submit(); }}>
                    <Input label="Nome: " value={nome} updateValue={setNome} />
                    <Input label="Imagem: " value={imagem} updateValue={setImagem} />
                    <Input label="Tipo: " value={tipo} updateValue={setTipo} />
                    <Input label="Idade: " value={idade} updateValue={setIdade} />
                    <Input label="Raça: " value={raca} updateValue={setRaca} />
                    <Input label="Status de adoção: " value={statusadocao} updateValue={setStatusAdocao} />
                    <Input label="Descrição: " value={descr} updateValue={setDescr} />
                    <button type="submit" className='btn-secondary'>
                        {createMutation.isPending ? 'Enviando...' : 'ENVIAR'}
                    </button>
                    <button className="cancel-btn" onClick={closeModal} title="Fechar">CANCELAR</button>
                </form>
            </div>
        </div>
    );
}