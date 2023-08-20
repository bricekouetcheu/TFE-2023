import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Multiselect, { filterOptions, comparator } from '../../composants/Multiselect';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
jest.mock('axios');

describe('filterOptions function', () => {
    const options = [
      { label: 'Option A' },
      { label: 'Option B' },
      { label: 'Option C' },
    ];
  
    it('qhould filters options based on input value', () => {
      const input = 'B';
      const filteredOptions = filterOptions(options, input);
      expect(filteredOptions).toEqual([{ label: 'Option B' }]);
    });
  
    it(' should returns an empty array when no options match the input', () => {
      const input = 'D';
      const filteredOptions = filterOptions(options, input);
      expect(filteredOptions).toEqual([]);
    });
  });
  
  describe('comparator function', () => {
    it('compares two values correctly', () => {
      const value1 = { value: 5 };
      const value2 = { value: 10 };
      const result = comparator(value1, value2);
      expect(result).toBe(-5);
    });
  });
