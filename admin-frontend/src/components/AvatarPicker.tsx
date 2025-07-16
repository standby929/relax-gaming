import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import type { AvatarPickerProps } from '../types/avatar';
import { AVATARS } from '../api/avatars';

export default function AvatarPicker({ value, onChange }: AvatarPickerProps) {
  return (
    <div className="w-full">
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div>
            <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">Avatar</Listbox.Label>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <span className="flex items-center gap-2">
                  {value?.url ? (
                    <img src={value.url} alt="" className="h-6 w-6 rounded-full" />
                  ) : (
                    <div className="h-6 w-6 bg-gray-200 rounded-full" />
                  )}
                  <span className="block truncate">{value?.label || 'Choose avatar'}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                as="div"
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-opacity-5 focus:outline-none">
                  {AVATARS.map((avatar) => (
                    <Listbox.Option
                      key={avatar.id}
                      value={avatar}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 px-3 flex items-center gap-2 ${
                          active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <img src={avatar.url} alt="" className="h-6 w-6 rounded-full" />
                          <span className="block truncate">{avatar.label}</span>
                          {selected && (
                            <span className="ml-auto text-blue-600">
                              <CheckIcon className="h-4 w-4" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        )}
      </Listbox>
    </div>
  );
}
