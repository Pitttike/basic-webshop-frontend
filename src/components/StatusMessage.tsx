
import { createPortal } from 'react-dom';
import { ApiStatus} from '../types';

function StatusMessage({ message, success }: ApiStatus) {

    if (success) {
        return createPortal(
            <div className={"success"}> {message} </div>,
            document.body
        );
    } else {

        return createPortal(
            <div className={"error"}> {message} 
             </div>,
            document.body
        );
    }
}

export default StatusMessage