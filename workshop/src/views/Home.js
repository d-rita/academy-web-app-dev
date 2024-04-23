import { useConfig } from '@dhis2/app-runtime'
import { Tag } from '@dhis2/ui'
import React from 'react'
import i18n from '../locales/index.js'

export const Home = () => {
    const { apiVersion } = useConfig()

    return (
        <div>
            <h1>{i18n.t('Home')}</h1>

            <p>{i18n.t('DHIS2 Web App Academy 2024')}</p>
            <Tag positive>{i18n.t(`Running on API Version ${apiVersion}`)}</Tag>
        </div>
    )
}
