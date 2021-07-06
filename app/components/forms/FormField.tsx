import React from 'react';
import { View } from 'react-native';
import { useFormikContext, FormikErrors } from 'formik';

import TextInput from '../TextInput';
import ErrorMessage from './ErrorMessage';
import { FieldNames, Name } from './formFieldNames';

interface FormFieldProps {
  name: Name;
  placeholder: string;
}

const AppFormField = ({ name, placeholder, ...otherProps }: FormFieldProps) => {
  const {
    errors,
    setFieldTouched,
    setFieldValue,
    touched,
    values,
  } = useFormikContext<FieldNames>();

  return (
    <View style={{ marginBottom: errors[name] && touched[name] ? 10 : 0 }}>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text: any) => setFieldValue(name, text)}
        placeholder={placeholder}
        value={values[name]}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

export default AppFormField;
