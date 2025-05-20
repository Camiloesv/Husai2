import { Listbox } from '@headlessui/react';

const options = [
  { id: 'en',  flag: '/flags/us.svg' },
  { id: 'es',  flag: '/flags/es.svg' },
  { id: 'fr',  flag: '/flags/fr.svg' },
];

function CustomSelect({ value, onChange }) {
  const selectedOption = options.find((opt) => opt.id === value) || options[0];

  return (
    <div className="relative w-24">
      <Listbox value={value} onChange={onChange}>
        <Listbox.Button className="w-full flex justify-center items-center py-1.5 px-2 bg-dark-card/20 backdrop-blur-md border border-dark-border/30 hover:border-cyan-400 hover:shadow-[0_0_8px_2px_rgba(34,211,238,0.6)] rounded-xl shadow-md text-text-secondary focus:outline-none transition-all">
          <img src={selectedOption.flag} alt={selectedOption.id} className="w-5 h-5 rounded-full" />
        </Listbox.Button>
        <Listbox.Options className="absolute w-full mt-1 overflow-auto text-base bg-dark-card/70 backdrop-blur-lg border border-dark-border/30 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
          {options.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option.id}
              className={({ active }) =>
                `cursor-pointer select-none relative py-2 pl-10 pr-4 flex items-center gap-2 ${
                  active ? 'bg-purple-600 text-white' : 'text-text-primary'
                }`
              }
            >
              <img src={option.flag} alt={option.id} className="w-5 h-5 rounded-full" />
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}

export default CustomSelect;
