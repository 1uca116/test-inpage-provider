import Modal from '../components/Modal';
import { observer } from 'mobx-react-lite';
import { useLayoutStore } from '../provider/LayoutStoreProvider';

const ModalArea = observer(() => {
    const layoutStore = useLayoutStore();

    return (
        <Modal
            size='sm'
            show={layoutStore.contentModal.show}
            onClose={() => layoutStore.hideContentModal()}
        >
            {layoutStore.contentModal.content}
        </Modal>
    );
});

export default ModalArea;