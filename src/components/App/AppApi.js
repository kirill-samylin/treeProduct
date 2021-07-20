import { 
    testProductArray,
} from '../../utils';

export function fetchTree() {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: testProductArray }), 500)
  );
}
