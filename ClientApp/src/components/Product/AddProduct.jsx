import React, { useState } from 'react'
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Button,
    Modal,
    Form,
} from 'semantic-ui-react'


export function AddProduct({ onProductAdded }) {
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        price: '',
    });

    const validateForm = () => {
        let errors = {};
        let valid = true;

        if (!formData.name || !formData.name.trim()) {
            errors.name = 'Name is required';
            valid = false;
        }

        if (!formData.price || !formData.price.trim()) {
            errors.price = 'Price is required';
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

            fetch('/product/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    price: formData.price
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((newProduct) => {
                    onProductAdded(newProduct);
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
            trigger={<Button color='blue'>New Product</Button>}
            size='tiny'
        >
            <ModalHeader>Create Product</ModalHeader>
            <ModalContent>
                <Form class="ui form">
                    <Form.Field>
                        <label>NAME</label>
                        <input id='name' name='name' onChange={handleInputChange} onBlur={handleInputBlur} value={formData.name} />
                        {formErrors.name && <div className="error-text">{formErrors.name}</div>}
                    </Form.Field>
                    <Form.Field>
                        <label>Price</label>
                        <input id='price' name='price' onChange={handleInputChange} onBlur={handleInputBlur} value={formData.price} />
                        {formErrors.price && <div className="error-text">{formErrors.price}</div>}
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

export default AddProduct