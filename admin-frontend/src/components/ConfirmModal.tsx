import { Dialog } from '@headlessui/react';
import Spinner from './Spinner';
import { useRef } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  itemName: string;
  inProgress: boolean;
  primaryActionText?: string;
  secondaryActionText?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({
  isOpen,
  title,
  message,
  itemName,
  inProgress,
  primaryActionText = 'Delete',
  secondaryActionText = 'Cancel',
  onCancel,
  onConfirm
}: ConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, () => {
    if (!inProgress) onCancel();
  }, isOpen);

  return (
    <Dialog open={isOpen} onClose={() => {onCancel}} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div ref={modalRef} className="bg-white rounded-lg p-6 z-10 w-full max-w-sm mx-auto">
        <Dialog.Title className="text-lg font-semibold mb-4">
          {title}
        </Dialog.Title>
        <p className="text-sm text-gray-700 mb-6">
          {message} <strong>{itemName}</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            disabled={inProgress}
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {secondaryActionText}
          </button>
          <button
            disabled={inProgress}
            onClick={onConfirm}
            className="px-4 py-2 text-sm text-white rounded bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {inProgress && <Spinner size="sm" className="text-white" />}
            {primaryActionText}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
