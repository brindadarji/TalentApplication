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

export function UpdateProduct({ selectedProduct, onProductUpdated }) {
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: selectedProduct?.name || '',
        price: selectedProduct?.price || '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            fetch('/product/update/' + selectedProduct.id, {
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
                .then((updatedProduct) => {
                    onProductUpdated(updatedProduct);
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
            <ModalHeader>Edit Product</ModalHeader>
            <ModalContent>
                <Form>
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

export default UpdateProduct