import { useLatestMeasurements } from "../lib-cl/api/api";

const Card = ({ location, onClose = () => { } }) => {
    const { id, name } = location;
    const { data: latestMeasurements, error: latestMeasurementsError } = useLatestMeasurements(id)
    const measurement = latestMeasurements?.results[0];
    if (!measurement) return <div className="flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    </div>
    return (
        <div className="relative flex flex-col bg-white rounded-lg p-4 text-gray-900">
            <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-2 top-2 cursor-pointer text-gray-600" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div className="pr-8">
                {
                    Boolean(measurement) &&
                    <>
                        {/* <span className="text-xs">{location.lastUpdated}</span> */}
                        <h2 className="font-bold text-indigo-600">{name}</h2>
                        <p className="text-xs">{`in ${measurement.city}, Great Britain`}</p>
                        <div className="font-bold text-xs">
                            <span>Values: </span>
                            {measurement.measurements?.map(({ parameter, value }) => <span key={parameter} className="uppercase">{parameter}: {value}</span>)}
                        </div>
                    </>
                }

            </div>
        </div>
    )
}

export default Card;