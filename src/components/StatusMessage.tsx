
import { createPortal } from 'react-dom';

export interface StatusMessageProps {
    message: string;
    error?: string
    status?: number
    success?: boolean
}

function StatusMessage({ message, error, success }: StatusMessageProps) {

    if (success) {
        return createPortal(
            <div className={"success"}> {message} </div>,
            document.body
        );
    } else {

        return createPortal(
            <div className={"error"}> {message} <br /> &#40;{error}&#41;</div>,
            document.body
        );
    }
}

export default StatusMessage