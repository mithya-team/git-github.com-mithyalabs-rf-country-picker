import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { COUNTRY_LIST } from 'react-forms'
import { TextField, TextFieldProps } from '@material-ui/core'
import { IFieldProps } from 'react-forms'
import { FormikValues } from 'formik'
import { get } from 'lodash'

export interface IMUICountryPickerProps extends IFieldProps {
	renderInputProps?: TextFieldProps
}

export interface MUICountryPickerProps extends IFieldProps {
	fieldProps?: IMUICountryPickerProps
}

export const MUICountryPicker: React.FC<MUICountryPickerProps> = (props: MUICountryPickerProps) => {
	const { fieldProps = {} as IMUICountryPickerProps, formikProps = {} as FormikValues } = props
	const { renderInputProps } = fieldProps
	const handleChange = (event: any) => {
		formikProps.setFieldValue(get(fieldProps, 'name'), event.currentTarget.innerText)
	}
	return <Autocomplete
		options={COUNTRY_LIST}
		getOptionLabel={(option) => (option as Record<string, string>).name}
		onChange={handleChange}
		renderInput={(params) => <TextField {...params} label="Country" {...renderInputProps} />}
	/>
}