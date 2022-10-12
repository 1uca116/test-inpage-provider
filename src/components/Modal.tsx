import { useMemo } from 'react';
import {ReactComponent as Close} from "../assets/close.svg";

type ModalProps = {
    size: 'sm';
    show: boolean;
    onClose?: () => void;
    children?: JSX.Element | JSX.Element[] | string;
};

const Modal = ({ size, show, children, onClose }: ModalProps) => {
    const modalClass = useMemo(() => {
        switch (size) {
            case 'sm':
                return 'min-w-[95vw] max-w-[95vw] sm:min-w-[320px] sm:max-w-[320px]';
        }
    }, [size]);

    if (!show) {
        return null;
    }

    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center'>
            <div className='absolute inset-0 -z-10 modal_overlay_background' />
            <div
                className={`${modalClass} relative modal_background shadow-primary rounded-xl py-3`}
            >
                <div className='absolute top-2 right-0 flex items-center justify-end px-2'>
                    <Close
                        className='text-2xl text-secondary-1 cursor-pointer'
                        onClick={() => onClose?.()}
                    />
                </div>
                <div className='px-5 pt-1 pb-2'>{children}</div>
            </div>
        </div>
    );
};

export default Modal;