import React, { useState } from 'react'
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Button,
    Modal,
    Form,
    Icon,
} from 'semantic-ui-react'

export function UpdateCustomer({ selectedCustomer, onCustomerUpdated }) {
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: selectedCustomer?.name || '',
        address: selectedCustomer?.address || '',
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        address: '',
    });

    const validateForm = () => {
        let errors = {};
        let valid = true;

        if (!formData.name || !formData.name.trim()) {
            errors.name = 'Name is required';
            valid = false;
        }

        if (!formData.address || !formData.address.trim()) {
            errors.address = 'Address is required';
            valid = false;
        }
        setFormErrors(errors);
        return valid;
    };
   

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: '' });
    };

    const handleInputBlur = (e) => {
        const { name, value } = e.target;
        if (!value.trim()) {
            setFormErrors({ ...formErrors, [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required` });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            fetch('/customer/update/' + selectedCustomer.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    address: formData.address
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((updatedCustomer) => {
                    onCustomerUpdated(updatedCustomer);
                    setOpen(false);
                })
                .catch((error) => {
                    console.error('Error Updating form:', error);
                });
        };
    }
    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button color='yellow' icon labelPosition='left'><Icon name='edit' />Edit</Button>}
            size='tiny'
        >
            <ModalHeader>Edit Customer</ModalHeader>
            <ModalContent>
                <Form>
                    <Form.Field>
                        <label>NAME</label>
                        <input id='name' name='name' onChange={handleInputChange} onBlur={handleInputBlur} value={formData.name} />
                        {formErrors.name && <div className="error-text">{formErrors.name}</div>}
                    </Form.Field>
                    <Form.Field>
                        <label>ADDRESS</label>
                        <input id='address' name='address' onChange={handleInputChange} onBlur={handleInputBlur} value={formData.address} />
                        {formErrors.address && <div className="error-text">{formErrors.address}</div>}
                    </Form.Field>
                </Form>
            </ModalContent>
            <ModalActions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content="Edit"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={handleSubmit}
                    positive
                />
            </ModalActions>
        </Modal>
    )
}

export default UpdateCustomer