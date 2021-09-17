import { useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "./index.module.scss";

export const UserPage = () => {
  const [username, setUsername] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    history.push({
      pathname: "/repos",
      state: {
        username
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        className={styles.input}
        type="text"
        autoFocus
        placeholder="github username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        disabled={!username.trim().length}
        className={styles.button}
        type="submit"
      >
        next
      </button>
    </form>
  );
};
