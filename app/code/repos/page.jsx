import { FaStar, FaCodeBranch, FaEye } from "react-icons/fa";
import Link from "next/link";
async function fetchRepos() {
    const response = await fetch('https://api.github.com/users/bradtraversy/repos', {
        next: {
            revalidate: 60  // cache for 60s
        }
    });

    // await new Promise((resolve) => setTimeout(resolve, 3000)); // wait to see the load spinner

    const repos =  await response.json();
    return repos;
}
const ReposPage = async () => {
    const repos = await fetchRepos();
    console.log(repos)
  return (
      <div className='repos-container'>
          <h2>Repositories</h2>
          <ul className="repo-list">
              {repos.map((repo) => (
                  <li key={repo.id}>
                      <Link href={`/code/repos/${repo.name}`}>
                          <h3>{repo.name}</h3>
                          <p>{repo.description}</p>
                          <div className="repo-details">
                              <span>
                                  <FaStar /> {repo.stargazers_count}
                              </span>
                              <span>
                                  <FaCodeBranch /> {repo.forks_count}
                              </span>
                              <span>
                                  <FaEye /> {repo.watchers_count}
                              </span>
                          </div>
                      </Link>
                  </li>
              ))}
          </ul>
      </div>
  )
}

export default ReposPage