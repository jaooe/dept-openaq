import { useState } from 'react';
import AutoComplete from '../components/AutoComplete';
import Card from '../components/Card';
import { useAllCitiesGB } from "../lib-cl/api/api";


export default function Home() {

  const { data: allCitiesGB, error: allCitiesGBError } = useAllCitiesGB();

  const [locations, setLocations] = useState([]);

  const addLocation = async (city) => {
    const response = await fetch(`https://docs.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&radius=1000&city=${city}&order_by=lastUpdated&dumpRaw=false`).then(r => r.json())
    const newLocations = locations.concat([response.results.at(-1)]);
    setLocations(newLocations);
  }

  const removeLocation = (index) => {
    const newLocations = locations.filter((_, i) => i !== index);
    setLocations(newLocations);
  }

  return (
    <div className="flex">
      <aside className="flex bg-violet-600 w-1/6 lg:w-1/3" />
      <main className="w-screen min-h-screen bg-gradient-to-r from-violet-600 to-sky-600 lg:py-32 flex flex-col justify-center text-white">
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
            options={allCitiesGB?.results?.map((entry, i) => ({ text: entry.city, id: i }))}
            onSelect={({ text }) => addLocation(text)}
          />
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-0 xl:px-40">
          {locations.map((location, i) => {
            return <Card key={location.id} onClose={() => removeLocation(i)} key={i} location={location} />
          })}
        </div>
      </main >
      <aside className="flex w-1/6 lg:w-1/3 bg-sky-600" />
    </div >

  )
}
