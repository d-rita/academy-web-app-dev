/* eslint-disable react/prop-types */
import { useDataMutation } from '@dhis2/app-runtime'
import { Button } from '@dhis2/ui'
import React, { useState } from 'react'
import i18n from '../../locales/index.js'
import { EditAttributeModal, ViewAttributeModal } from './attributeModals.js'

const deleteMutation = {
    resource: 'attributes',
    type: 'delete',
    id: ({ id }) => id,
}

const editMutation = {
    resource: 'attributes',
    type: 'update',
    id: ({ id }) => {
        id
    },
    partial: true,
    data: ({ name }) => ({
        name: name,
    }),
}

export const ViewAttributeButton = ({
    loading,
    view,
    setViewAll,
    itemData,
}) => {
    return (
        <>
            <Button
                small
                secondary
                disabled={loading}
                onClick={() => setViewAll(true)}
            >
                {i18n.t('View')}
            </Button>
            {view && (
                <ViewAttributeModal
                    open={view}
                    onClose={() => setViewAll(false)}
                    data={itemData}
                />
            )}
        </>
    )
}

export const EditAttributeButton = ({ id, show, refetch, name }) => {
    const [open, setOpen] = useState(false)
    const [newName, setNewName] = useState(name)

    const [renameAttribute, { loading }] = useDataMutation(editMutation, {
        onComplete: () => {
            show({
                message: `An attribute with ID ${id} was successfully updated!`,
                status: 'success',
            })
            setOpen(false)
        },
        onError: (error) => {
            console.log(error.details)
            show({
                message: `${error} - ${error.details.message}`,
                status: 'error',
            })
            setOpen(false)
        },
    })

    const handleChange = ({ value }) => {
        setNewName(value)
    }

    const handleAction = async () => {
        const res = await renameAttribute({ id: id, name: newName })
        console.log(res)
        refetch()
        setOpen(false)
    }

    return (
        <>
            <Button
                small
                secondary
                disabled={loading}
                onClick={() => setOpen(true)}
            >
                {i18n.t('Rename')}
            </Button>
            {open && (
                <EditAttributeModal
                    open={open}
                    onClose={() => setOpen(false)}
                    handleAction={handleAction}
                    newName={newName}
                    handleChange={handleChange}
                />
            )}
        </>
    )
}

export const DeleteAttributeButton = ({ id, show, refetch }) => {
    const [deleteAttribute, { loading }] = useDataMutation(deleteMutation, {
        onComplete: () => {
            show({
                message: `An attribute with ID ${id} was successfully deleted!`,
                status: 'success',
            })
        },
        onError: (error) => {
            show({ message: `${error}`, status: 'error' })
        },
    })

    const onClick = () => {
        deleteAttribute({ id }).then(refetch)
    }

    return (
        <Button small destructive disabled={loading} onClick={onClick}>
            {i18n.t('Delete')}
        </Button>
    )
}
