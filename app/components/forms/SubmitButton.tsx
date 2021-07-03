import React from 'react';
import { useFormikContext } from 'formik';
import Button from '../Button';

const SubmitButton = ({ title }: { title: string }) => {
  const { handleSubmit } = useFormikContext();
  return <Button title={title} onPress={handleSubmit} />;
};

export default SubmitButton;
