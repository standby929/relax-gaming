import { useEffect, useState } from 'react';
import { fetchPlayerById, fetchPlayers, createPlayer, updatePlayer, deletePlayer } from '../api/playerApi';
import type { Player } from '../types/player';
import Profile from '../components/Profile';
import SearchBar from '../components/SearchBar';
import PlayerDrawer from '../components/PlayerDrawer';
import Spinner from '../components/Spinner';
import NoResult from '../components/NoResult';
import { PlayerList } from '../components/PlayerList';

import RelaxLogo from '../assets/logo-relax-gaming.svg';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import ConfirmModal from '../components/ConfirmModal';


export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [playerToEdit, setPlayerToEdit] = useState<Player | undefined>(undefined);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState<Player | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = async (playerId: string) => {
    setIsEditLoading(true);
    try {
      const detailedPlayer = await fetchPlayerById(playerId);
      setPlayerToEdit(detailedPlayer);
      setDrawerOpen(true);
    } catch (err) {
      console.error('Failed to fetch player:', err);
    } finally {
      setIsEditLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!playerToDelete) return;
    setIsDeleting(true);

    try {
      await deletePlayer(playerToDelete._id);
      const updated = await fetchPlayers();
      setAllPlayers(updated);
      setFilteredPlayers(updated);
    } catch (err) {
      console.error('Failed to delete player:', err);
    } finally {
      setIsDeleting(false);
      setPlayerToDelete(null); // modal bezárása itt történik
    }
  };

  const handleDelete = (player: Player) => {
    setPlayerToDelete(player);
  };

  useEffect(() => {
    setIsLoading(true);
    const load = async () => {
      const data = await fetchPlayers();
      setAllPlayers(data);
      setFilteredPlayers(data);
      setIsLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      setFilteredPlayers(
        allPlayers.filter((p) => p.name.toLowerCase().includes(lower))
      );
    } else {
      setFilteredPlayers(allPlayers);
    }
  }, [searchTerm, allPlayers]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-4 pb-8">
      {/* Header and profile */}
      <div className="flex justify-between items-center mb-4">
        <img src={RelaxLogo} alt="Relax Gaming Logo" className="w-40 mb-6" />
        <Profile />
      </div>

      {/* Search bar, button(s) and results info */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 mb-4">
        <div className="text-sm text-gray-600 ml-1">
          Results: {filteredPlayers.length}
          {searchTerm && (
            <span className="text-gray-400">
              {' '}
              (filtered from {allPlayers.length})
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2">
          <SearchBar onSearch={(query) => setSearchTerm(query)} />
          <button
            onClick={() => {
              setPlayerToEdit(undefined);
              setDrawerOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-white rounded bg-teal-400 hover:bg-teal-500 transition-colors"
          >
            <UserPlusIcon className="h-5 w-5" />
            Add Player
          </button>
        </div>
      </div>

      {/* Scrollable list container */}
      <div
        className="
          flex flex-col
          h-[calc(100vh-270px)]  // mobile (default)
          sm:h-[calc(100vh-195px)] // tablet+
        "
      >
        <div className="flex-1 overflow-hidden min-h-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <Spinner size="xl" className="text-teal-500" />
            </div>
          ) : filteredPlayers.length === 0 ? (
            <NoResult message={searchTerm ? 'No players match your search.' : 'No players available.'} />
          ) : (
            <PlayerList
              players={filteredPlayers}
              onEdit={(player) => handleEdit(player._id)}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      <PlayerDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={async (playerData) => {
          try {
            setIsLoading(true);

            if (playerToEdit) {
              // update existing player
              await updatePlayer({ ...playerToEdit, ...playerData });
            } else {
              // create new player
              await createPlayer(playerData);
            }

            const updatedList = await fetchPlayers(); // refresh list to handle concurrency
            setPlayerToEdit(undefined); // reset edit state
            setAllPlayers(updatedList);
            setFilteredPlayers(updatedList);
            setDrawerOpen(false);
          } catch (err) {
            console.error('Failed to save player:', err);
            throw err; // rethrow to handle in the drawer
          } finally {
            setIsLoading(false);
          }
        }}
        existingPlayer={playerToEdit}
        isLoading={isEditLoading}
      />

      <ConfirmModal
        isOpen={!!playerToDelete}
        title='Confirm Deletion'
        message='Are you sure you want to delete the player'
        itemName={playerToDelete?.name || ''}
        inProgress={isDeleting}
        onCancel={() => setPlayerToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}