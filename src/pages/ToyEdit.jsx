import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"
// import { useOnlineStatus } from "../hooks/useOnlineStatusSyncStore.js"
import { useOnlineStatus } from "../hooks/useOnlineStatus.js"
import { useConfirmTabClose } from "../hooks/useConfirmTabClose.js"
import { LabelPicker } from '../cmps/LabelPicker.jsx'
import { LabelMultiSelect } from "../cmps/LabelMultiSelect.jsx"

import { Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'


function CustomInput(props) {
    return (
        <TextField {...props} variant="outlined" />
    )
}

const ToySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    price: Yup.number().min(1, 'Price must be at least 1').required('Price is required'),
    imgUrl: Yup.string().url('Invalid URL').required('Image URL is required'),
})

export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    const isOnline = useOnlineStatus()
    const setHasUnsavedChanges = useConfirmTabClose()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function formValidationClass(errors, touched) {
        const isError = !!Object.keys(errors).length
        const isTouched = !!Object.keys(touched).length
        if (!isTouched) return ''
        return isError ? 'error' : 'valid'
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
        setHasUnsavedChanges(true)
    }

    function handleUpdateLabels(label, action) {
        setToyToEdit(prev => {
            let labels = prev.labels || []
            if (action === 'add') {
                if (!labels.includes(label)) labels.push(label)
            } else if (action === 'remove') {
                labels = labels.filter(lbl => lbl !== label)
            }
            return { ...prev, labels }
        })
    }

    function onSaveToy(values) {
        const toyData = { ...toyToEdit, ...values }
        if (!toyData.price) toyData.price = 1000

        saveToy(toyData)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                setHasUnsavedChanges(false)
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
            })
    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <Formik
                initialValues={toyToEdit}
                enableReinitialize={true}
                validationSchema={ToySchema}
                onSubmit={onSaveToy}
            >
                {({ errors, touched, values, setFieldValue }) => {
                    const validationClass = formValidationClass(errors, touched)

                    return (
                        <Form className={`formik ${validationClass}`}>
                            <div className="form-grid">
                                <Field
                                    as={CustomInput}
                                    label="Toy Name"
                                    name="name"
                                />
                                {errors.name && touched.name && <div className="errors">{errors.name}</div>}

                                <Field
                                    as={CustomInput}
                                    label="Price"
                                    name="price"
                                    type="number"
                                />
                                {errors.price && touched.price && <div className="errors">{errors.price}</div>}

                                <Field
                                    as={CustomInput}
                                    label="Image URL"
                                    name="imgUrl"
                                />
                                {errors.imgUrl && touched.imgUrl && <div className="errors">{errors.imgUrl}</div>}

                                <LabelMultiSelect
                                    selectedLabels={values.labels || []}
                                    onUpdateLabels={(labels) => setFieldValue('labels', labels)}
                                />

                                <Box sx={{ width: 222.4 }}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="inStock-label">In Stock</InputLabel>
                                        <Select
                                            labelId="inStock-label"
                                            id="inStock"
                                            name="inStock"
                                            value={values.inStock === undefined ? '' : values.inStock}
                                            onChange={(ev) => setFieldValue('inStock', ev.target.value)}
                                            label="In Stock"
                                        >
                                            <MenuItem value="">All</MenuItem>
                                            <MenuItem value={true}>Yes</MenuItem>
                                            <MenuItem value={false}>No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>

                            <div className="actions">
                                <Button type="submit" variant="contained">
                                    {toyToEdit._id ? 'Save' : 'Add'}
                                </Button>
                                <Button ><Link to="/toy">Cancel</Link></Button>
                            </div>

                            <section>
                                <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
                            </section>
                        </Form>
                    )
                }}
            </Formik>
        </section>
    )
}

//     return (
//         <>
//             <div></div>
//             <section className="toy-edit">
//                 <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

//                 <form onSubmit={onSaveToy} >
//                     <label htmlFor="name">Toy Name : </label>
//                     <input type="text"
//                         name="name"
//                         id="name"
//                         placeholder="Enter name..."
//                         value={toyToEdit.name}
//                         onChange={handleChange}
//                     />
//                     <label htmlFor="price">Price : </label>
//                     <input type="number"
//                         name="price"
//                         id="price"
//                         placeholder="Enter price"
//                         value={toyToEdit.price || ''}
//                         onChange={handleChange}
//                     />

//                     <label htmlFor="imgUrl">Image URL: </label>
//                     <input
//                         type="text"
//                         name="imgUrl"
//                         id="imgUrl"
//                         placeholder="Enter image URL..."
//                         value={toyToEdit.imgUrl}
//                         onChange={handleChange}
//                     />

//                     <LabelMultiSelect
//                         selectedLabels={toyToEdit.labels || []}
//                         onUpdateLabels={(labels) => setToyToEdit(prev => ({ ...prev, labels }))}
//                     />

//                     {/* <LabelPicker
//                         selectedLabels={toyToEdit.labels ? [...toyToEdit.labels] : []}
//                         onUpdateLabels={handleUpdateLabels}
//                     /> */}


//                     <label htmlFor="inStock">In Stock: </label>
//                     <select
//                         name="inStock"
//                         id="inStock"
//                         value={toyToEdit.inStock === undefined ? '' : toyToEdit.inStock}
//                         onChange={handleChange}
//                     >
//                         <option value="">All</option>
//                         <option value={true}>Yes</option>
//                         <option value={false}>No</option>
//                     </select>


//                     <div>
//                         <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
//                         <Link to="/toy">Cancel</Link>
//                     </div>
//                     <section>
//                         <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
//                     </section>
//                 </form>
//             </section>
//         </>
//     )
// }


