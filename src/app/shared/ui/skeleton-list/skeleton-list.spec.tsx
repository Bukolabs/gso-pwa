import { render } from '@testing-library/react';

import SkeletonList from './skeleton-list';

describe('SkeletonList', () => {
   it('should render successfully', () => {
      const { baseElement } = render(<SkeletonList count={1} />);
      expect(baseElement).toBeTruthy();
   });
});
