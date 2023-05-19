import { observer } from 'mobx-react-lite';
import React from 'react';
import Modal from '../modal';
import { useLayoutStore } from '../../../provider/LayoutStoreProvider';

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
