
import { Button } from 'antd';
import { FaPlusCircle } from 'react-icons/fa';

const AddDC: React.FC<any> = ({ handleCardClick }) => (
  <div className=" my-10">
    <Button
      type='default'  
      onClick={handleCardClick}
      className='w-[16vw] m-auto'
    >
      Create New DC
      <FaPlusCircle
        style={{ color: 'green' }}
        className="mx-2 text-green-400"
      />
    </Button>
  </div>
);

export default AddDC;
