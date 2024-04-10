import {
    Button,
    InputFieldFF,
    ReactFinalForm,
    SwitchFieldFF,
    SingleSelectFieldFF,
    dhis2Username,
    hasValue,
    composeValidators,
    dhis2Password,
    email,
    createEqualTo,
} from '@dhis2/ui'
import React from 'react'
import styles from './Form.module.css'

/**
 * This is just a function to demonstrate the values when the form is submitted
 * It takes the form's values (which is an object), transforms it into readable JSON,
 * and then finally displays the values in an alert box
 *
 * @param {Object} values
 * @param {string} values.title
 * @param {string} values.surname
 * @param {string} values.firstname
 * @param {string} values.email
 * @param {string} values.confirm_email
 * @param {bool} values.newsletter
 */
const alertValues = (values) => {
    const formattedValuesString = JSON.stringify(values, null, 2)
    alert(formattedValuesString)
}

const { Field, Form: RFForm } = ReactFinalForm

export const Form = () => (
    <div>
        <h1>Form</h1>

        <RFForm onSubmit={alertValues}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <Field
                            name="title"
                            label="Title *"
                            component={SingleSelectFieldFF}
                            className={styles.title}
                            options={
                                [
                                    { label: 'None', value: 'None' },
                                    { label: 'Doctor', value: 'Dr' },
                                    { label: 'Professor', value: 'Prof' },
                                ]
                            }
                            initialValue={'None'}
                            validate={hasValue}
                        />
                    </div>
                    <div className={styles.row}>
                        <Field
                            name="surname"
                            label="Surname *"
                            component={InputFieldFF}
                            className={styles.surname}
                            validate={hasValue}
                        />
                        <Field
                            name="firstname"
                            label="First Name *"
                            component={InputFieldFF}
                            className={styles.firstname}
                            validate={hasValue}
                        />
                    </div>
                    <div className={styles.row}>
                        <Field
                            name="username"
                            label="Username *"
                            component={InputFieldFF}
                            className={styles.field}
                            validate={composeValidators(hasValue, dhis2Username)}
                        />
                    </div>
                    <div className={styles.row}>
                        <Field
                            name="password"
                            label="Password *"
                            component={InputFieldFF}
                            className={styles.field}
                            type='password'
                            validate={composeValidators(hasValue, dhis2Password)}
                        />
                    </div>
                    <div className={styles.row}>
                        <Field
                            name="email"
                            label="Email Address *"
                            component={InputFieldFF}
                            className={styles.email}
                            validate={composeValidators(hasValue, email)}
                        />
                    </div>
                    <div className={styles.row}>
                        <Field
                            name="confirm_email"
                            label="Confirm Email Address *"
                            component={InputFieldFF}
                            className={styles.field}
                            validate={composeValidators(hasValue, email, createEqualTo("email", "the provided email address"))}
                        />
                    </div>
                    <div className={styles.row}>
                        <Field
                            name="newsletter"
                            label="I want to receive the newsletter"
                            component={SwitchFieldFF}
                            className={styles.field}
                            type='checkbox'
                            initialValue={false}
                        />
                    </div>
                    <div className={styles.row}>
                        <Button primary type='submit'>Submit form</Button>
                    </div>
                </form>
            )}
        </RFForm>
    </div>
)
