import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import { getInstance } from "../../api";

interface Repo {
  id: number;
  name: string;
  full_name: string;
}

export const ReposPage = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState("");
  const history = useHistory();
  const location = useLocation<{ username: string }>();

  useEffect(() => {
    const fetchRepos = async (username: string) => {
      try {
        const res = await getInstance().get(`/users/${username}/repos`);
        setRepos(res.data);
      } catch (e) {
        setError(
          "There was an issue with the request.. check the provided username maybe?"
        );
      }
    };

    if (location.state?.username) {
      fetchRepos(location.state.username);
    } else {
      history.push("/");
    }
  }, [location.state, history]);

  return (
    <div>
      <button onClick={() => history.push("/")} className="back">
        ←
      </button>
      {error ? <div>{error}</div> : null}
      {repos.map((repo) => (
        <div key={repo.id}>
          <Link
            to={{
              pathname: "/content",
              state: {
                repoName: repo.full_name
              }
            }}
          >
            {repo.name}
          </Link>
        </div>
      ))}
    </div>
  );
};
