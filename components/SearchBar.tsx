import { motion } from "framer-motion";

interface SearchBarProps {
  search: string;
  onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ search, onChangeHandler }: SearchBarProps) => (
  <motion.form
    className="lg:w-3/12"
    initial={{ x: 60, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.3 }}
    onSubmit={(e) => e.preventDefault()}
  >
    <input
      type="search"
      name="search"
      value={search}
      placeholder="Search..."
      className="form-input p-2 border border-text-light border-opacity-20 text-text uppercase w-full mb-6"
      required
      onChange={onChangeHandler}
    />
  </motion.form>
);

export default SearchBar;
