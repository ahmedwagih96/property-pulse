
import { Bars } from  'react-loader-spinner'
function LoadingSpinner() {
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <Bars
        height="80"
        width="80"
        color="#a3a8a8"
        ariaLabel="bars-loading"
        visible={true}
      />
    </div>
  );
}

export default LoadingSpinner;
