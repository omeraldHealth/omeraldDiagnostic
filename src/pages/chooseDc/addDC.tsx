import { Button } from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';

const AddDC: React.FC<any> = ({ handleCardClick }) => (
  <div className="w-[20vw] my-10">
    <Button
      onClick={handleCardClick}
      variant="outline"
      color={'orange'}
      size="sm"
      border={'1px'}
      className="w-[20vw] text-sm font-light bg-green-500 border-4"
      spinnerPlacement="end"
    >
      Create New DC{' '}
      <FaPlusCircle
        style={{ color: 'green' }}
        className="mx-2 text-green-400"
      />
    </Button>
  </div>
);

export default AddDC;
