import { useAlert, useDataQuery } from '@dhis2/app-runtime'
import {
    ButtonStrip,
    Center,
    CircularLoader,
    NoticeBox,
    Table,
    TableBody,
    TableCell,
    TableCellHead,
    TableFoot,
    TableHead,
    TableRow,
    TableRowHead,
} from '@dhis2/ui'
import React, { useState } from 'react'
import {
    DeleteAttributeButton,
    EditAttributeButton,
    ViewAttributeButton,
} from '../components/attributes/attributeActions.js'
import AttributeCreateForm from '../components/attributes/attributesForm.js'
import { AttributesPagination } from '../components/attributes/attributesPagination.js'
import i18n from '../locales/index.js'

const query = {
    attributeData: {
        resource: 'attributes',
        params: ({ page, pageSize }) => ({
            // fields: ['id', 'displayName', 'unique', 'valueType'],
            fields: '*',
            pageSize,
            order: 'displayName:DESC',
            page,
        }),
    },
    myUserData: {
        resource: 'me',
        params: {
            fields: ['displayName', 'email'],
        },
    },
}

export const Attributes = () => {
    // we get the data using a custom hook
    // we will update this implementation after learning about app-runtime

    const [viewAll, setViewAll] = useState(false)

    const { show } = useAlert(
        ({ message }) => message,
        ({ status }) =>
            status === 'error' ? { critical: true } : { success: true }
    )

    const { loading, data, error, refetch } = useDataQuery(query, {
        variables: {
            pageSize: 5,
        },
        onError: (error) => {
            show({
                message: `${error}`,
                status: 'error',
            })
        },
    })

    return (
        <>
            <div>
                <h1>{i18n.t('Attributes')}</h1>
                {loading && (
                    <Center>
                        <CircularLoader />
                    </Center>
                )}
                {!loading && error && (
                    <NoticeBox error>{error.message}</NoticeBox>
                )}
                {!loading && !error && data?.myUserData && (
                    <p>
                        {i18n.t(
                            `Attributes visible to ${data.myUserData.displayName} (${data.myUserData.email})`
                        )}
                    </p>
                )}
                {
                    // if there is any data available
                    !loading && !error && data?.attributeData?.attributes && (
                        <Table>
                            <TableHead>
                                <TableRowHead>
                                    <TableCellHead>
                                        {i18n.t('Name')}
                                    </TableCellHead>
                                    <TableCellHead>
                                        {i18n.t('Unique')}
                                    </TableCellHead>
                                    <TableCellHead>
                                        {i18n.t('Value Type')}
                                    </TableCellHead>
                                    <TableCellHead>
                                        {i18n.t('Actions')}
                                    </TableCellHead>
                                </TableRowHead>
                            </TableHead>
                            <TableBody>
                                {data.attributeData.attributes.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            {item.displayName}
                                        </TableCell>
                                        <TableCell>
                                            {item.unique === true
                                                ? 'Yes'
                                                : 'No'}
                                        </TableCell>
                                        <TableCell>{item.valueType}</TableCell>
                                        <TableCell>
                                            <ButtonStrip>
                                                <ViewAttributeButton
                                                    // id={item.id} show={show}
                                                    loading={loading}
                                                    view={viewAll}
                                                    setViewAll={setViewAll}
                                                    itemData={item}
                                                />

                                                <EditAttributeButton
                                                    id={item.id}
                                                    name={item.displayName}
                                                    show={show}
                                                    refetch={refetch}
                                                />

                                                <DeleteAttributeButton
                                                    id={item.id}
                                                    show={show}
                                                    refetch={refetch}
                                                />
                                            </ButtonStrip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFoot>
                                <TableRow>
                                    <TableCell colSpan="100%">
                                        {!loading &&
                                            !error &&
                                            data?.attributeData?.pager && (
                                                <AttributesPagination
                                                    pageData={
                                                        data.attributeData.pager
                                                    }
                                                    refetch={refetch}
                                                />
                                            )}
                                    </TableCell>
                                </TableRow>
                            </TableFoot>
                        </Table>
                    )
                }
            </div>
            <div>
                <AttributeCreateForm show={show} refetch={refetch} />
            </div>
        </>
    )
}
