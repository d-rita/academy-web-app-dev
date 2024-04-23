/* eslint-disable react/prop-types */
import {
    Button,
    Modal,
    ModalActions,
    ModalContent,
    ModalTitle,
    ButtonStrip,
    InputField,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'

export const ViewAttributeModal = ({ data, onClose, open }) => {
    return (
        <Modal hide={!open} onClose={onClose} small>
            <ModalTitle>{i18n.t('Attribute Details')}</ModalTitle>
            <ModalContent>{JSON.stringify(data, null, 2)}</ModalContent>
            <ModalActions>
                <Button onClick={onClose} primary>
                    {i18n.t('Close')}
                </Button>
            </ModalActions>
        </Modal>
    )
}

export const EditAttributeModal = ({
    handleAction,
    onClose,
    open,
    handleChange,
    newName,
}) => {
    return (
        <Modal hide={!open} onClose={onClose} small>
            <ModalTitle>{i18n.t('Rename Attribute?')}</ModalTitle>
            <ModalContent>
                <InputField
                    type="text"
                    label={i18n.t('Name')}
                    name={i18n.t('Name')}
                    onChange={handleChange}
                    value={newName}
                />
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button onClick={onClose} secondary>
                        {i18n.t('Cancel')}
                    </Button>
                    <Button onClick={handleAction} primary>
                        {i18n.t('Rename')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}
