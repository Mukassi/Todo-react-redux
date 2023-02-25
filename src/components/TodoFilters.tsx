import { useAppDispatch, useAppSelector } from "../hooks/redux.hook";
import { changeFilter } from "../store/filtersSlice";

type IFilters = { name: string; label: string }[];

const filters: IFilters = [
  { name: "Process", label: "В работе" },
  { name: "Favorite", label: "Избранные" },
  { name: "Completed", label: "Завершенные" },
];

const TodoFilters = () => {
  const dispatch = useAppDispatch();
  const { activeFilter } = useAppSelector((state) => state.filter);
  const onChangeFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    if (name === activeFilter) {
      dispatch(changeFilter("All"));
    } else {
      dispatch(changeFilter(name));
    }
  };

  return (
    <div className="filters-wrapper">
      {filters.map(({ name, label }) => (
        <button
          key={name}
          name={name}
          onClick={onChangeFilter}
          className={
            "filter-button" +
            (activeFilter === name ? " active-filter-button" : "")
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TodoFilters;
