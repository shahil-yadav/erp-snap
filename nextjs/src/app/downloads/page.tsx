async function Page() {
   const releases = await fetch(process.env.VCS_RELEASE_URL).then((data) => data.json())
   return <div>{releases.length}</div>
}

export default Page
