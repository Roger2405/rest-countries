import { ArrowLeft } from 'phosphor-react';
import './styles.scss';

export default function ButtonBack({ onClick }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className="buttonBack" onClick={onClick}>
            <ArrowLeft />
            Back
        </button >
    )
}