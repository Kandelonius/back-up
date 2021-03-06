import React, { useState, useEffect } from 'react';
import Div from './styled-comp/register-comp.jsx'
import axios from 'axios'
import * as yup from 'yup'

const url = "https://fitness-demo.herokuapp.com/api/users/register"

const initialFormValues = {
    username: '',
    password: '',
    fname: '',
    lname: '',
    email: '',
    roleid: 1,
}
const initialFormErrors = {
    username: '',
    email: '',
    password: '',
}
const formSchema = yup.object().shape({
    fname: yup
        .string()
        .min(1, '*first name is required*')
        .required('firstname is required'),
    lname: yup
        .string()
        .min(1, '*last name is required*')
        .required('lastname is required'),
    username: yup
        .string()
        .min(2, '*username must have at least 2 characters!*')
        .required('username is required'),
    email: yup
        .string()
        .email('*a VALID email is required*')
        .required('email is required'),
    password: yup
        .string()
        .min(6, '*password must have at least 6 characters!*')
        .required('password is required'),
    roleid: yup
        .number()
})
function Register(props) {
    const [users, setUsers] = useState([])
    const [userValues, setUserValues] = useState(initialFormValues)
    const [formDisabled, setFormDisabled] = useState(true)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    
    const postUser = user => {
        axios.post(url, user)
            .then(res => {
                setUsers([...users, res.data])
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                debugger
            })
    }

    useEffect(() => {
        formSchema.isValid(userValues)
            .then(valid => {
                setFormDisabled(!valid)
            })
    }, [userValues])

    const onSubmit = evt => {
        evt.preventDefault()

        const newUser = {
            username: userValues.username,
            password: userValues.password,
            fname: userValues.fname,
            lname: userValues.lname,
            email: userValues.email,
            roleid: Object.keys(userValues.roleid),
        }
        postUser(newUser)
        setUserValues(initialFormValues)
    }
    const onInputChange = evt => {
        const name = evt.target.name
        const value = evt.target.value
        const checked = evt.target.checked
        yup
            .reach(formSchema, name)
            .validate(value)
            .then(valid => {
                setFormErrors({
                    ...formErrors,
                    [name]: '',
                })
            })
            .catch(err => {
                setFormErrors({
                    ...formErrors,
                    [name]: err.errors[0]
                })
            })

        setUserValues({
            ...userValues,
            [name]: value,
        })
    }
    const onCheckboxChange = evt => {
        const { name } = evt.target
        const isChecked = evt.target.checked

        setUserValues({
            ...userValues,
            roleid: {
                ...userValues.roleid,
                [name]: isChecked,
            }
        })
    }
    return <div>
        <Form
            values={userValues}
            onInputChange={onInputChange}
            // onCheckboxChange={onCheckboxChange}
            onSubmit={onSubmit}
            disabled={formDisabled}
            errors={formErrors}
        />
    </div>
}
function Form(props) {
    const {
        values,
        onInputChange,
        // onCheckboxChange,
        onSubmit,
        disabled,
        errors,
    } = props
    return (
        <Div>
            <header>
                <h3>Anywhere Fitness</h3>
            </header>
            <img src="/img/fitness-couple.jpg" className="registerImage" alt="Man holding woman up with his feet as she poses" />
            <h2>Sign Up</h2>
            <div className="field-container">
                <div className='errors'>
                    {errors.username}<br />
                    {errors.email}<br />
                    {errors.password}
                </div>
                <div className="input-form">
                    <label>First Name:&nbsp;
                            <input
                            value={values.fname}
                            onChange={onInputChange}
                            name='fname'
                            type='text'
                        /></label>
                    <label>Last Name:&nbsp;
                            <input
                            value={values.lname}
                            onChange={onInputChange}
                            name='lname'
                            type='text'
                        /></label>
                    <label>Username:&nbsp;
                            <input
                            value={values.username}
                            onChange={onInputChange}
                            name='username'
                            type='text'
                        /></label>
                    <label>Email:&nbsp;
                            <input
                            value={values.email}
                            onChange={onInputChange}
                            name='email'
                            type='text'
                        /></label>
                    <label>Password:&nbsp;
                            <input
                            value={values.password}
                            onChange={onInputChange}
                            name='password'
                            type='password'
                        /></label>
                    <label>Client/Instructor:&nbsp;
                    <select
                            value={values.roleid}
                            checked={values.roleid}
                            onChange={onInputChange}
                            name='roleid'
                        // type='checkbox'
                        >
                            <option value={1}>client</option>
                            <option value={2}>instructor</option>
                            </select></label>
                </div>
                                <div className='errors'>
                                    {errors.fname}<br />
                                    {errors.lname}
                                </div>
            </div>
                            <button onClick={onSubmit} disabled={disabled}>Confirm</button>
        </Div>
    )
}

export default Register