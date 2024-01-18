import React, { useState } from 'react'
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Button,
    Modal,
    Form,
} from 'semantic-ui-react'


export function AddCustomer({ onCustomerAdded }) {
    const [open, setOpen] = useState(false);
   

    const [formData, setFormData] = useState({
        name: '',
        address: '',
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

    const handleCancel = () => {
        setFormData({});
        setFormErrors({});
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {

            fetch('/customer/create', {
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
                .then((newCustomer) => {
                    onCustomerAdded(newCustomer);
                    setOpen(false);
                    setFormData({});
                })
                .catch((error) => {
                    console.error('Error submitting form:', error);
                });
        };
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button color='blue'>New Customer</Button>}
            size='tiny'
        >
            <ModalHeader>Create Customer</ModalHeader>
            <ModalContent>
                <Form class="ui form">
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
                <Button color='black' onClick={handleCancel}>
                    Cancel
                </Button>
                <Button
                    content="Create"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={handleSubmit}
                    positive
                />
            </ModalActions>
        </Modal>
    )
}

export default AddCustomer