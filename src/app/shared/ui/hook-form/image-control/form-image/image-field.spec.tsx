import { render } from '@testing-library/react';

import ImageField from './image-field';

describe('ImageField', () => {
   it('should render successfully', () => {
      const { baseElement } = render(<ImageField />);
      expect(baseElement).toBeTruthy();
   });
});
