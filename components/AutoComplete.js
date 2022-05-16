import { useState, useEffect } from 'react';
const LARGE_LIST_THRESHOLD = 30;

const AutoComplete = ({ icon, placeholder, onSelect = (option) => { }, options = [] }) => {
    const [value, setValue] = useState('');
    const [autocompleteOptions, setAutoCompleteOptions] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (value.replace(/\s/, '').length === 0) {
            setAutoCompleteOptions([]);
            return
        } else {
            const toMatch = new RegExp(`${value}`, 'i')
            const filteredOptions = options.filter(option => option.text.match(toMatch));
            setAutoCompleteOptions(filteredOptions);
        }
    }, [value])

    const select = option => {
        setValue('');
        onSelect(option);
        setSelected(null);
    }

    return (
        <div className={`autocomplete ${autocompleteOptions.length > LARGE_LIST_THRESHOLD ? 'large-list' : ''} bg-white inline-block rounded-md text-gray-900 w-full lg:w-72`}>
            <div className="flex items-center p-2 border border-gray-400 rounded-md">
                {icon}
                <input value={value} className="outline-none w-full" placeholder={placeholder} onChange={e => {
                    setValue(e.currentTarget.value)
                    if (selected) setSelected(null);
                }} />
                {selected && <svg onClick={() => deselect(selected)} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>}
            </div>
            <div
                style={{
                    overflow: 'overlay',
                }}
                className="text-left max-h-36 overflow-y-scroll overflow-x-overlay  rounded-md"
            >
                {!selected && autocompleteOptions.map(({ text, id }) => <span key={text} onClick={() => select({ text, id })} className="w-full px-4 py-1 block hover:bg-gray-200 hover:cursor-pointer">{text}</span>)}
            </div>
        </div>
    )
}

export default AutoComplete;