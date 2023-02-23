import { useAppDispatch } from "../hooks/redux.hook";
import { changeFilter } from "../store/filtersSlice";

type IFilters = string[];

const filters: IFilters = ["All", "Favorite", "Completed"];

const TodoFilters = () => {
  const dispatch = useAppDispatch();
  const onChangeFilter = (event: any) => {
    const { name } = event.target;
    dispatch(changeFilter(name));
  };
  return (
    <div className="controls">
      <div className="filters">
        {filters.map((filter) => (
          <button key={filter} name={filter} onClick={onChangeFilter}>
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoFilters;
