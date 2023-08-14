import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StepThree from '../../composants/StepThree';
import { BrowserRouter } from 'react-router-dom';

it('calls OnSubmit when form is submitted with files', () => {
    const handleFormData = jest.fn();
    const onPrev = jest.fn();
    const OnSubmit = jest.fn();
    const deleteFile = jest.fn();

    const file = new File(['file content'], 'test-file.ifc', { type: 'text/plain' });
    const fileList = [file];

    render(<BrowserRouter><StepThree values={{ files: fileList }} handleFormData={handleFormData} onPrev={onPrev} OnSubmit={OnSubmit} deleteFile={deleteFile} /></BrowserRouter>);

    const submitButton = screen.getByTestId('btn-submit');
    fireEvent.click(submitButton);

    expect(OnSubmit).toHaveBeenCalledTimes(1);
  });


  it('should not call submit function when file is not upload', () => {
    const handleFormData = jest.fn();
    const onPrev = jest.fn();
    const OnSubmit = jest.fn();
    const deleteFile = jest.fn();



    render(<BrowserRouter><StepThree values={{ files: [] }} handleFormData={handleFormData} onPrev={onPrev} OnSubmit={OnSubmit} deleteFile={deleteFile}  /></BrowserRouter>);

    const submitButton = screen.getByTestId('btn-submit');
    fireEvent.click(submitButton);

    expect(OnSubmit).toHaveBeenCalledTimes(0);
  });