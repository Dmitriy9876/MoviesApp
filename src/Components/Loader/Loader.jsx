import { Spin } from 'antd';
import './Loader.css';

function Loader() {
    return (
        <div className="example">
            <Spin className="loader" tip="Loading...">
                <div className="content" />
            </Spin>
        </div>
        
    );
  }

export default Loader;