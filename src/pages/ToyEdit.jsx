import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useOnlineStatus } from "../hooks/useOnlineStatus.js"
import { useConfirmTabClose } from "../hooks/useConfirmTabClose.js"
import { LabelPicker } from '../cmps/LabelPicker.jsx'
import { LabelMultiSelect } from "../cmps/LabelMultiSelect.jsx"
import { useTranslation } from 'react-i18next'

import { Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

function CustomInput(props) {
    return (
        <TextField {...props} variant="outlined" />
    )
}

export function ToyEdit() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    const isOnline = useOnlineStatus()
    const setHasUnsavedChanges = useConfirmTabClose()

    // Schema with translations
    const ToySchema = Yup.object().shape({
        name: Yup.string().required(t('Name is required')),
        price: Yup.number().min(1, t('Price must be at least 1')).required(t('Price is required')),
        imgUrl: Yup.string().url(t('Invalid URL')).required(t('Image URL is required')),
    })

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
                showSuccessMsg(t('Toy Saved!'))
                setHasUnsavedChanges(false)
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg(t('Had issues in toy details'))
            })
    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? t('Edit Toy') : t('Add Toy')}</h2>

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
                                    label={t("Toy Name")}
                                    name="name"
                                />
                                {errors.name && touched.name && <div className="errors">{errors.name}</div>}

                                <Field
                                    as={CustomInput}
                                    label={t("Price")}
                                    name="price"
                                    type="number"
                                />
                                {errors.price && touched.price && <div className="errors">{errors.price}</div>}

                                <Field
                                    as={CustomInput}
                                    label={t("Image URL")}
                                    name="imgUrl"
                                />
                                {errors.imgUrl && touched.imgUrl && <div className="errors">{errors.imgUrl}</div>}

                                <Box sx={{ width: 222.4 }}>
                                    <FormControl fullWidth variant="outlined">
                                        <LabelMultiSelect
                                            selectedLabels={values.labels || []}
                                            onUpdateLabels={(labels) => setFieldValue('labels', labels)}
                                        />
                                    </FormControl>
                                </Box>

                                <Box sx={{ width: 222.4 }}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="inStock-label">{t('In Stock')}</InputLabel>
                                        <Select
                                            labelId="inStock-label"
                                            id="inStock"
                                            name="inStock"
                                            value={values.inStock === undefined ? '' : values.inStock}
                                            onChange={(ev) => setFieldValue('inStock', ev.target.value)}
                                            label={t('In Stock')}
                                        >
                                            <MenuItem value="">{t('All')}</MenuItem>
                                            <MenuItem value={true}>{t('Yes')}</MenuItem>
                                            <MenuItem value={false}>{t('No')}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>

                            <div className="actions">
                                <Button type="submit" variant="contained">
                                    {toyToEdit._id ? t('Save') : t('Add')}
                                </Button>
                                <Button><Link to="/toy">{t('Cancel')}</Link></Button>
                            </div>

                            <section>
                                <h1>{isOnline ? `✅ ${t('Online')}` : `❌ ${t('Disconnected')}`}</h1>
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


