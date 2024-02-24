import Loadable from 'react-loadable';
import { Spinner } from '@components/atoms/loader';

// Function to create a loading component with Spinner
const LoadingComponent = () => <Spinner />;

// Function to create a loadable component with dynamic import
export const LoadableComponent = (importFunc: () => Promise<any>) =>
  Loadable({
    loader: importFunc,
    loading: LoadingComponent,
    delay: 200, // Optional delay before rendering loading component (milliseconds)
  });
