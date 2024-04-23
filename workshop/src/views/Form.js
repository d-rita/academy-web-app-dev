import { useAlert } from '@dhis2/app-runtime'
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
import i18n from '../locales/index.js'
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

const { Field, Form: RFForm } = ReactFinalForm

export const Form = () => {
    const { show } = useAlert(
        ({ message }) => message,
        ({ status }) =>
            status === 'error' ? { critical: true } : { success: true }
    )

    const onSubmit = (values) => {
        let error = new Error('Something went wrong! Try again')
        error = undefined
        if (error) {
            show({ message: error.message, status: 'error' })
        } else {
            show({
                message: `Form submitted: ${JSON.stringify(values, null, 2)}`,
                status: 'success',
            })
        }
    }
    return (
        <div>
            <h1>{i18n.t('Form')}</h1>

            <RFForm onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={styles.row}>
                            <Field
                                required
                                name="title"
                                label={i18n.t('Title')}
                                component={SingleSelectFieldFF}
                                className={styles.title}
                                options={[
                                    { label: i18n.t('None'), value: 'None' },
                                    { label: i18n.t('Doctor'), value: 'Dr' },
                                    {
                                        label: i18n.t('Professor'),
                                        value: 'Prof',
                                    },
                                ]}
                                initialValue={'None'}
                                validate={hasValue}
                            />
                        </div>
                        <div className={styles.row}>
                            <Field
                                required
                                name="surname"
                                label={i18n.t('Surname')}
                                component={InputFieldFF}
                                className={styles.surname}
                                validate={hasValue}
                            />
                            <Field
                                required
                                name="firstname"
                                label={i18n.t('First Name')}
                                component={InputFieldFF}
                                className={styles.firstname}
                                validate={hasValue}
                            />
                        </div>
                        <div className={styles.row}>
                            <Field
                                required
                                name="username"
                                label={i18n.t('Username')}
                                component={InputFieldFF}
                                className={styles.field}
                                validate={composeValidators(
                                    hasValue,
                                    dhis2Username
                                )}
                            />
                        </div>
                        <div className={styles.row}>
                            <Field
                                required
                                name="password"
                                label={i18n.t('Password')}
                                component={InputFieldFF}
                                className={styles.field}
                                type="password"
                                validate={composeValidators(
                                    hasValue,
                                    dhis2Password
                                )}
                            />
                        </div>
                        <div className={styles.row}>
                            <Field
                                required
                                name="email"
                                label={i18n.t('Email Address')}
                                component={InputFieldFF}
                                className={styles.email}
                                validate={composeValidators(hasValue, email)}
                            />
                        </div>
                        <div className={styles.row}>
                            <Field
                                required
                                name="confirm_email"
                                label={i18n.t('Confirm Email Address')}
                                component={InputFieldFF}
                                className={styles.field}
                                validate={composeValidators(
                                    hasValue,
                                    email,
                                    createEqualTo(
                                        'email',
                                        i18n.t('the provided email address')
                                    )
                                )}
                            />
                        </div>
                        <div className={styles.row}>
                            <Field
                                name="newsletter"
                                label={i18n.t(
                                    'I want to receive the newsletter'
                                )}
                                component={SwitchFieldFF}
                                className={styles.field}
                                type="checkbox"
                                initialValue={false}
                            />
                        </div>
                        <div className={styles.row}>
                            <Button primary type="submit">
                                {i18n.t('Submit form')}
                            </Button>
                        </div>
                    </form>
                )}
            </RFForm>
        </div>
    )
}
