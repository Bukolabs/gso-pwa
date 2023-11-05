import { render } from '@testing-library/react';

import HeaderContent from './header-content';

describe('HeaderContent', () => {
   it('should render successfully', () => {
      const { baseElement } = render(<HeaderContent />);
      expect(baseElement).toBeTruthy();
   });
});
