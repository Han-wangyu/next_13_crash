import { FaStar, FaCodeBranch, FaEye } from "react-icons/fa";
import Link from "next/link";

async function fetchRepo(name) {
    const response = await fetch(`https://api.github.com/repos/bradtraversy/${name}`, {
        next: {
            revalidate: 60  // cache for 60s
        }
    });
    const repo = await response.json();
    return repo;
}

 const Repo = async ( { name } ) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const repo = await fetchRepo(name);
    // console.log(repo);
    return (
        <>
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
            <div className="card-stats">
                <div className="card-stat">
                    <FaStar />
                    <span>{repo.stargazers_count}</span>
                </div>
                <div className="card-stat">
                    <FaCodeBranch />
                    <span>{repo.forks_count}</span>
                </div>
                <div className="card-stat">
                    <FaEye />
                    <span>{repo.watchers_count}</span>
                </div>
            </div>
        </>
    )
 }

 export default Repo