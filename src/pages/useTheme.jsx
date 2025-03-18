import useTheme from "../hooks/useTheme";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useTheme();

  return (
    <div>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      
    </div>
  );
};

export default ThemeSwitcher;
