import { useState, useEffect } from 'react';
import { useAllCitiesGB } from "../lib-cl/api/api";

const LARGE_LIST_THRESHOLD = 30;

const AutoComplete = ({ icon, placeholder, onSelect, options = [] }) => {

  const [value, setValue] = useState('');
  const [autocompleteOptions, setAutoCompleteOptions] = useState([]);

  useEffect(() => {
    if (value.replace(/\s/, '').length === 0) {
      setAutoCompleteOptions([]);
      return
    } else {
      const toMatch = new RegExp(`${value}`, 'i')
      const filteredOptions = options.filter(option => option.match(toMatch));
      setAutoCompleteOptions(filteredOptions);
    }
  }, [value])

  const selectOption = (option) => {
    setValue(option.text);
    onSelect(option);
  }

  return (
    <div className={`autocomplete ${autocompleteOptions.length > LARGE_LIST_THRESHOLD ? 'large-list' : ''} bg-white inline-block rounded-md text-gray-900 w-72`}>
      <div className="flex items-center p-2 border border-gray-400 rounded-md">
        {icon}
        <input value={value} className="outline-none" placeholder={placeholder} onChange={e => setValue(e.currentTarget.value)} />
      </div>
      <div
        style={{
          overflow: 'overlay',
        }}
        className="text-left max-h-36 overflow-y-scroll overflow-x-overlay  rounded-md"
      >
        {autocompleteOptions.map(({ text, id }) => <span className="w-full px-4 block hover:bg-gray-200 hover:cursor-pointer">{text}</span>)}
      </div>
    </div>
  )
}

const largeListStyle = {
  borderTop: '0px solid transparent',
  borderBottom: '0px solid transparent'
}

const Card = ({ preHeading, heading, description, tail, onClose = () => { } }) => {
  return (
    <div className="relative flex flex-col bg-white rounded-lg p-4 text-gray-900">
      <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-2 top-2 cursor-pointer" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <div className="pr-8">
        <span className="text-xs">{preHeading}</span>
        <h2 className="font-bold text-indigo-600">{heading}</h2>
        <p className="text-xs">{description}</p>
        <span className="font-bold text-xs">{tail}</span>
      </div>
    </div>
  )
}

export default function Home() {

  const { data: allCitiesGB, error: allCitiesGBError } = useAllCitiesGB();

  return (
    <div className="flex">
      <aside className="flex bg-violet-600 w-1/3" />
      <main className="w-screen h-screen bg-gradient-to-r from-violet-600 to-sky-600 py-32 flex flex-col justify-center text-white">
        <section className="text-center mb-16">
          <h1 className="text-4xl mb-4">Compare your Air</h1>
          <p className="text-lg font-thin mb-8">
            Compare the air quality between cities in the UK.<br />
            Select cities to compare using the search tool below.
          </p>
          <AutoComplete
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>}
            placeholder="Enter city name..."
            options={allCitiesGB?.results?.map(entry => entry.city)}
          />
        </section>
        <div className="grid grid-cols-2 gap-8 px-40">
          <Card
            preHeading={"UPDATED AN HOUR AGO"}
            heading="Manchester Piccadilly"
            description="in Manchester, United Kingdom"
            tail="Values: "
          />
          <Card
            preHeading={"UPDATED AN HOUR AGO"}
            heading="Manchester Piccadilly"
            description="in Manchester, United Kingdom"
            tail="Values: asdado uinefooiwbngwoie woeifgnwf oine "
          />
        </div>
      </main>
      <aside className="flex w-1/3 bg-sky-600" />
    </div>

  )
}
