import { Release } from "@/app/downloads/components/grid"
import { fetchAllGithubReleases } from "@/lib/data/fetch-github-releases"
import { fetchReleaseById } from "@/lib/data/fetch-release-by-id"
import { Metadata } from "next"
import { permanentRedirect, redirect } from "next/navigation"
import React from "react"

export const metadata: Metadata = {
   title: "Release",
}

export async function generateStaticParams() {
   const releases = await fetchAllGithubReleases()

   return releases.map((release) => ({
      id: release.id.toString(),
   }))
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
   const release = await fetchReleaseById(id)

   if (release === undefined) {
      permanentRedirect("/")
   }

   return <Release release={release} />
}
