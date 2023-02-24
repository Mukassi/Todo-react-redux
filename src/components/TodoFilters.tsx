import { useAppDispatch } from "../hooks/redux.hook";
import { changeFilter } from "../store/filtersSlice";

type IFilters = string[];

const filters: IFilters = ["Все", "Избранные", "Завершенные"];

const TodoFilters = () => {
  const dispatch = useAppDispatch();
  const onChangeFilter = (event: any) => {
    const { name } = event.target;
    dispatch(changeFilter(name));
  };
  return (
    <div className="filters-wrapper">

        {filters.map((filter) => (
          <button
            key={filter}
            name={filter}
            onClick={onChangeFilter}
            className="filter-button"
          >
            {filter}
          </button>
        ))}

    </div>
  );
};

export default TodoFilters;
