import React from 'react';
import { Formik } from 'formik';

interface FormProps {
  children: React.ReactNode;
  initialValues: object;
  onSubmit: (arg: any) => any;
  validationSchema: object;
}

const AppForm = ({
  children,
  initialValues,
  onSubmit,
  validationSchema,
}: FormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

export default AppForm;
