import FormPage from '../../components/form/FormPage';
import { FC } from 'react';

export const NotFound404: FC = () => {
  return (
    <FormPage>
      <h1 className='text text_type_main-large'>Упс! Что-то пошло не так</h1>
    </FormPage>
  );
};
