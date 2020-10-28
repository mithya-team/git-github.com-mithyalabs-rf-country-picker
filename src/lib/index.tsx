import React from 'react'
import { attachField } from 'react-forms'
import { MUICountryPicker } from '..'

export { MUICountryPicker } from './MUICountryPicker'

attachField('country', <MUICountryPicker />)
