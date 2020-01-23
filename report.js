const devBranch = process.env.GH_DEV_BRANCH || 'master'
const prdBranch = process.env.GH_PROD_BRANCH || 'prd'

process.stdin.setEncoding("utf8");
let whole = "";

process.stdin.on("readable", () => {
  let chunk;
  
  // Use a loop to make sure we read all available data.
  while ((chunk = process.stdin.read()) !== null) {
    whole += chunk;
  }
});

function pendingDeploy(repo) {
  return repo[prdBranch].target.authoredDate === repo[devBranch].target.authoredDate
}

process.stdin.on("end", () => {
  const result = JSON.parse(whole);

  const repos = result.data.organization.repositories.nodes;
  const deployableRepos = repos.filter((x) => x.prd !== null)

  console.log(deployableRepos.map((x) => `${x.name} ${pendingDeploy(x) ? '' : '*'}`).join('\n'))
});
