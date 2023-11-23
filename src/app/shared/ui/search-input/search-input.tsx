import { InputText } from "primereact/inputtext";
import styles from "./search-input.module.scss";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import classNames from "classnames";

export interface SearchInputProps {
  searchTerm?: string;
  className?: string;
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
}

export function SearchInput({
  searchTerm = "",
  className,
  placeholder,
  onSearch,
}: SearchInputProps) {
  const [searchPhrase, setsearchPhrase] = useState(searchTerm);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setsearchPhrase(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(searchPhrase);
    }
  };

  const clearSearchPhrase = (_: SyntheticEvent) => {
    setsearchPhrase("");
    onSearch("");
  };

  return (
    <div className={`mb-2 w-full`}>
      <span className="p-input-icon-left w-full">
        <i className="pi pi-search" />
        <InputText
          value={searchPhrase}
          placeholder={placeholder}
          onChange={handleSearch}
          onKeyUp={handleKeyPress}
          className={className}
        />
        {searchPhrase && (
          <i
            className={classNames(
              styles["right-icon"],
              `pi pi-times cursor-pointer`
            )}
            onClick={clearSearchPhrase}
          />
        )}
      </span>
    </div>
  );
}

export default SearchInput;
