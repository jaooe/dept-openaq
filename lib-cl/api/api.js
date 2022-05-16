import useSWR from "swr";
import fetch from 'unfetch';

const OPENAQ_API_BASE_URL = process.env.NEXT_PUBLIC_OPENAQ_API_BASE_URL;
const fetcher = url => fetch(`${OPENAQ_API_BASE_URL}/${url}`).then(r => r.json());

export const useAllCitiesGB = () => useSWR('/cities?limit=1000&page=1&offset=0&sort=asc&country_id=GB&order_by=city', fetcher);
export const useLatestMeasurements = (locationId) => useSWR(`/latest/${locationId}?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false`, fetcher)