import { Release } from "@/app/downloads/components/grid"
import { fetchAllGithubReleases } from "@/lib/data/fetch-github-releases"
import { fetchReleaseById } from "@/lib/data/fetch-release-by-id"
import { permanentRedirect, redirect } from "next/navigation"
import React from "react"

export async function generateStaticParams() {
   const releases = await fetchAllGithubReleases()

   return releases.map((release) => ({
      id: release.id.toString(),
   }))
}

const Page = async ({ params: { id } }: { params: { id: string } }) => {
   const release = await fetchReleaseById(id)

   if (release === undefined) {
      permanentRedirect("/")
   }

   return <Release release={release} />
}

export default Page
