import React from 'react'
import i18n from '../locales/index.js'

export const Home = () => (
    <div>
        <h1>{i18n.t('Home')}</h1>

        <p>{i18n.t('DHIS2 Web App Academy 2024')}</p>
    </div>
)
