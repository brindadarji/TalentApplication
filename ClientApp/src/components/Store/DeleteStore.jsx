import React, { useState } from 'react'
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Button,
    Modal,
    Icon,
} from 'semantic-ui-react'

export function DeleteStore({ selectedStoreId, onStoreDeleted }) {
    const [open, setOpen] = useState(false);
   
    const handleSubmit = () => {
        fetch('/store/delete/' + selectedStoreId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            onStoreDeleted(selectedStoreId);
            setOpen(false);
        })
        .catch((error) => {
            console.error('Error Updating form:', error);
        });
    };

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button color='red' icon labelPosition='left'><Icon name='trash' />Delete</Button>}
            size='tiny'
        >
            <ModalHeader>Delete Store</ModalHeader>
            <ModalContent>
                <p>Are you sure?</p>
            </ModalContent>
            <ModalActions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content="Delete"
                    labelPosition='right'
                    icon='delete'
                    onClick={handleSubmit}
                    color='red'
                    
                />
            </ModalActions>
        </Modal>
    )
}

export default DeleteStore