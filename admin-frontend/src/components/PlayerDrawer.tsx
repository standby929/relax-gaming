import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import type { PlayerDrawerProps } from '../types/playerdrawerprops';
import type { Avatar } from '../types/avatar';
import Spinner from './Spinner';
import ValidationMessage from './ValidationMessage';
import CustomLabel from './CustomLabel';
import AvatarPicker from './AvatarPicker';
import { AVATARS } from '../api/avatars';

type FormData = {
  name: string;
  score: number | '';
};

export default function PlayerDrawer({ isOpen, onClose, onSave, existingPlayer, isLoading }: PlayerDrawerProps) {
  const [nameError, setNameError] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      score: ''
    }
  });

  const onSubmit = async (data: FormData) => {
    setNameError(null); // Reset any previous error

    try {
      await onSave({
        name: data.name.trim(),
        score: Number(data.score),
        avatarId: selectedAvatar?.id
      });
      onClose();
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setNameError(err.response.data.message);
      } else {
        console.error('Unexpected error while saving:', err);
      }
    }
  };
  
  useEffect(() => {
    if (existingPlayer) {
      reset({
        name: existingPlayer.name,
        score: existingPlayer.score
      });
      const match = AVATARS.find((a) => a.id === existingPlayer.avatarId);
      setSelectedAvatar(match || null);
    } else {
      reset({
        name: '',
        score: ''
      });
      setSelectedAvatar(null);
    }
  }, [existingPlayer, isOpen, reset]);


  return (
    <div
      className={clsx(
        'fixed top-0 right-0 h-full z-50 bg-white shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto border-l border-gray-200',
        'w-full sm:w-1/2 lg:w-1/3',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">
          {existingPlayer ? 'Modify Player' : 'Add New Player'}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-full py-10 text-gray-400">
          <Spinner size="lg" color="blue" />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log('Validation errors:', errors);
          })}
          className="p-4 space-y-4"
        >
          <div>
            <CustomLabel required>Name</CustomLabel>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={clsx(
                'w-full rounded-md border bg-white py-2 px-3 text-sm focus:outline-none focus:ring-1',
                errors.name
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              )}
            />
            <ValidationMessage message={errors.name?.message || nameError} />

          </div>

          <div>
            <CustomLabel required>Score</CustomLabel>
            <input
              type="number"
              {...register('score', {
                required: 'Score is required',
                min: { value: 0, message: 'Score must be at least 0' },
                max: { value: 100000, message: 'Score must be 100000 or less' }
              })}
              className={clsx(
                'w-full rounded-md border bg-white py-2 px-3 text-sm focus:outline-none focus:ring-1',
                errors.score
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              )}
            />
            <ValidationMessage message={errors.score?.message} />
          </div>

          <AvatarPicker
            value={selectedAvatar}
            onChange={(avatar) => setSelectedAvatar(avatar)}
          />

          <div className="pt-4">
            <button
              type="submit"
              disabled={!isValid}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-white rounded bg-teal-400 hover:bg-teal-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {existingPlayer ? 'Modify' : 'Save'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
