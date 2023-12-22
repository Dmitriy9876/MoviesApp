import { Pagination } from 'antd';
import './Pagination.css';

const PaginationComponent = ({ current, total, onChange }) => {
  const pageSize = 6;
  const maxPages = 500;
  const maxTotal = pageSize * maxPages; // Максимум 3000 фильмов
  const adjustedTotal = Math.min(total, maxTotal); // Не превышает максимальное число фильмов

  return (
    <Pagination
      current={current}
      total={adjustedTotal} // Используем скорректированное общее количество
      onChange={onChange}
      pageSize={pageSize}
      showSizeChanger={false}
    />
  );
};

export default PaginationComponent;