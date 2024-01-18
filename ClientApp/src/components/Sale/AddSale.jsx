import React, { useState } from 'react'
import { CustomerDropdown } from './CustomerDropdown';
import { ProductDropdown } from './ProductDropdown';
import { StoreDropdown } from './StoreDropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Button,
    Modal,
    Form,
} from 'semantic-ui-react'



export function AddSale({ onSaleAdded }) {
    const [open, setOpen] = useState(false);

    const [newSale, setNewSale] = useState({
        customerId: '',
        productId: '',
        storeId: '',
        dateSold: new Date(),
    });

    const [formErrors, setFormErrors] = useState({
        customerId: '',
        productId: '',
        storeId: '',
        dateSold: new Date(),
    });

    const validateForm = () => {
        let errors = {};
        let valid = true;

        if (!newSale.customerId) {
            errors.customerId = 'Please select customer';
            valid = false;
            console.log("No CustomerID");
        }

        if (!newSale.productId) {
            errors.productId = 'Please select product';
            valid = false;
            console.log("No CustomerID");
        }
        if (!newSale.storeId) {
            errors.storeId = 'Please select store';
            valid = false;
            console.log("No CustomerID");
        }
        setFormErrors(errors);
        return valid;
    };


    const handleCustomerSelect = (customerId) => {
        setNewSale({ ...newSale, customerId });
        console.log("Customer change happended");
        setFormErrors({ ...formErrors, [customerId]: '' });
    };

    const handleProductSelect = (productId) => {
        setNewSale({ ...newSale, productId });
        setFormErrors({ ...formErrors, [productId]: '' });
    };

    const handleStoreSelect = (storeId) => {
        setNewSale({ ...newSale, storeId });
        setFormErrors({ ...formErrors, [storeId]: '' });
    };

    const handleDateChange = (dateSold) => {
        setNewSale({ ...newSale, dateSold });
    };

    const handleCancel = () => {
        setNewSale({dateSold: new Date()});
        setFormErrors({});
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            fetch('/sale/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSale),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((newSale) => {
                    onSaleAdded(newSale);
                    setOpen(false);
                    setNewSale({ dateSold: new Date() });
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
            trigger={<Button color='blue'>New Sale</Button>}
            size='tiny'
        >
            <ModalHeader>Create Sale</ModalHeader>
            <ModalContent>
                <Form class="ui form">
                    <Form.Field>
                        <label>DateSold</label>
                        <DatePicker onChange={handleDateChange} value={newSale.dateSold.toLocaleDateString('en-US', 'MM/DD/YYYY')} />
                    </Form.Field>
                    <Form.Field>
                        <label>Customer</label>
                        <CustomerDropdown id="customerId" name="customerId" onSelectCustomer={handleCustomerSelect} />
                        {formErrors.customerId && <div className="error-text">{formErrors.customerId}</div>}
                    </Form.Field>
                    <Form.Field>
                         <label>Product</label>
                        <ProductDropdown id="productId" name="productId" onSelectProduct={handleProductSelect} />
                        {formErrors.productId && <div className="error-text">{formErrors.productId}</div>}
                    </Form.Field>
                    <Form.Field>
                         <label>Store</label>
                        <StoreDropdown id="storeId" name="storeId" onSelectStore={handleStoreSelect} />
                        {formErrors.storeId && <div className="error-text">{formErrors.storeId}</div>}
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

export default AddSale