import { useEffect, useState } from 'react';
import './App.css';
import { Card } from './components/card';
import type { AnimalData } from './interface/AnimalData';
import { useAnimalData } from './hooks/useAnimalData';
import { CreateModal } from './components/create-modal/create-modal';
import { UpdatePost } from './components/UpdatePost/UpdatePost';
import { useAnimalDataMutate } from './hooks/useAnimalDataMutate';
import { SearchIdModal } from './components/searchid-modal/searchid-modal';

function App() {
    const { data } = useAnimalData();
    const [selectedAnimal, setSelectedAnimal] = useState<AnimalData | null>(null); // Estado para o animal selecionado
    const [isEditPostOpen, setIsEditPostOpen] = useState(false); // Controle do modal de edição
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Controle do modal de criação

    useEffect(() => {
      console.log(data); // Isso será impresso no console do navegador
    }, [data]);

    const handleEditClick = (animal: AnimalData) => {
        setSelectedAnimal(animal); // Atualiza o animal selecionado
        setIsEditPostOpen(true); // Abre o modal de edição
    };
    
    const { deleteMutation } = useAnimalDataMutate();

    const handleDelete = (id: any) => {
        if (window.confirm("Tem certeza que deseja excluir este animal?")) {
            deleteMutation.mutate(id);
        }
    };
    const [searchId, setSearchId] = useState('');
    const [searchedAnimal, setSearchedAnimal] = useState<AnimalData | null>(null);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const handleSearch = () => {
        const found = data?.find(animal => String(animal.id) === searchId);
        if (found) {
            setSearchedAnimal(found);
            setIsSearchModalOpen(true);
        } else {
            alert('Animal não encontrado!');
        }
    };

    return (
        <div className="container">
            <header className="header">
                <img src="header.png" alt="Header" className="header-img" />
            </header>
            <button onClick={() => setIsCreateModalOpen(true)}>Cadastre um Bichinho</button>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar animal por ID"
                    value={searchId}
                    onChange={e => setSearchId(e.target.value)}
                />
                <button className="btn-search" onClick={handleSearch}>Buscar por ID</button>
            </div>
            <div className="card-grid">
                {data?.map(animal => ( // Corrigido para 'animal' em vez de 'AnimalData'
                    <Card 
                        key={animal.id}
                        {...animal} // Usando spread operator para passar todas as props
                        onEdit={handleEditClick} // Passa a função de edição
                        onDelete={handleDelete} // Passa a função de exclusão
                    />
                ))}
            </div>
            {isEditPostOpen && selectedAnimal && (
              <UpdatePost
                closeModal={() => {
                  setIsEditPostOpen(false);
                  setSelectedAnimal(null);
                }}
                animal={selectedAnimal} // Passa o animal selecionado para o modal
              />
    )}
            {isCreateModalOpen && (
                <CreateModal 
                    closeModal={() => setIsCreateModalOpen(false)} // Fecha o modal de criação
                    animal={null} // Não passa animal, pois é um novo cadastro
                    isEditMode={false} // Indica que não está em modo de edição
                />
            )}
            {isSearchModalOpen && searchedAnimal && (
                <SearchIdModal
                    animal={searchedAnimal}
                    closeModal={() => setIsSearchModalOpen(false)}
                />
            )}
        </div>
    );
}

export default App;