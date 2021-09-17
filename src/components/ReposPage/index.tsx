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
  const history = useHistory();
  const location = useLocation<{ username: string }>();

  useEffect(() => {
    const fetchRepos = async (username: string) => {
      const res = await getInstance().get(`/users/${username}/repos`);
      setRepos(res.data);
    };

    if (location.state) {
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
