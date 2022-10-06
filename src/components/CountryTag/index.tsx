import './styles.scss';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    countryName: string
}

export default function CountryTag({ countryName, onClick }: Props) {
    return (
        <span className="country-tag" onClick={onClick}>{countryName}</span>
    )
}