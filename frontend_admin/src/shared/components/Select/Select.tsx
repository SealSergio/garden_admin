interface selectProps {
    items: string[];
    handleClickOnItem: (item: string) => void;
}

export const Select: React.FC<selectProps> = ({items, handleClickOnItem}) => {
    return (
        <ul className="ageList">
            {items.map((age) => (
                <li key={age} className="ageItem" onClick={() => handleClickOnItem(age)}>{age}</li>
            ))}
        </ul>
    )
}