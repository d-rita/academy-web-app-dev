import {
    Center,
    CircularLoader,
    NoticeBox,
    Table,
    TableBody,
    TableCell,
    TableCellHead,
    TableHead,
    TableRow,
    TableRowHead,
} from '@dhis2/ui'
import React from 'react'
import { useGetAttributes } from '../hooks/index.js'

export const Attributes = () => {
    // we get the data using a custom hook
    // we will update this implementation after learning about app-runtime
    const { loading, error, data } = useGetAttributes()

    return (
        <div>
            <h1>Attributes</h1>
            {loading && (
                <Center>
                    <CircularLoader />
                </Center>
            )}
            {!loading && error && <NoticeBox error>{error.message}</NoticeBox>}
            {
                // if there is any data available
                !loading && !error && data?.attributes?.attributes && (
                    <Table>
                        <TableHead>
                            <TableRowHead>
                                <TableCellHead>Name</TableCellHead>
                                <TableCellHead>Unique</TableCellHead>
                            </TableRowHead>
                        </TableHead>
                        <TableBody>
                            {data.attributes.attributes.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.displayName}</TableCell>
                                    <TableCell>
                                        {item.unique === true ? 'Yes' : 'No'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )
            }
        </div>
    )
}
