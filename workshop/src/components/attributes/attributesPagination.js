/* eslint-disable react/prop-types */
import { Pagination } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'

export const AttributesPagination = ({ pageData, refetch }) => {
    const handlePageChange = (nextPage) => {
        refetch({ page: nextPage })
    }

    const handlePageSizeChange = (pageSize) => {
        refetch({ pageSize })
    }

    return (
        <Pagination
            {...pageData}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageLength={pageData.pageSize}
            previousPageText={() => i18n.t('Previous')}
            nextPageText={() => i18n.t('Next')}
            pageSelectText={() => i18n.t('Page')}
            pageSizeSelectText={() => i18n.t('Items per page')}
            isLastPage={!pageData.nextPage}
        />
    )
}
