import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { getInstance } from "../../api";

interface CommitData {
  sha: string;
}

interface FileItem {
  path: string;
  sha: string;
}

export const ContentPage = () => {
  const [repoName, setRepoName] = useState("");
  const [fileData, setFileData] = useState<FileItem[]>([]);
  const [readmeContent, setReadmeContent] = useState("");
  const history = useHistory();
  const location = useLocation<{ repoName: string }>();

  useEffect(() => {
    const fetchReadme = async (readme: FileItem) => {
      const { data }: { data: { content: string } } = await getInstance().get(
        `/repos/${repoName}/contents/${readme.path}`
      );
      setReadmeContent(data.content);
    };

    if (fileData.length) {
      const readme = fileData.find(
        (file) =>
          file.path.toLowerCase() === "readme.md" ||
          file.path.toLowerCase() === "readme"
      );

      if (readme) {
        fetchReadme(readme);
      }
    }
  }, [fileData, repoName]);

  useEffect(() => {
    const fetchContent = async (repoName: string) => {
      const {
        data: commitData
      }: { data: CommitData[] } = await getInstance().get(
        `/repos/${repoName}/commits`
      );
      const {
        data: { tree }
      }: { data: { tree: FileItem[] } } = await getInstance().get(
        `/repos/${repoName}/git/trees/${commitData[0].sha}`
      );
      setFileData(tree);
    };

    if (location.state?.repoName) {
      fetchContent(location.state.repoName);
      setRepoName(location.state.repoName);
    } else {
      history.push("/");
    }
  }, [location.state, history]);

  return (
    <div>
      <button onClick={() => history.push("/")} className="back">
        ←
      </button>
      {fileData.map((fileItem) => (
        <div key={fileItem.sha}>{fileItem.path}</div>
      ))}
      <hr />
      <ReactMarkdown>{atob(readmeContent)}</ReactMarkdown>
    </div>
  );
};
