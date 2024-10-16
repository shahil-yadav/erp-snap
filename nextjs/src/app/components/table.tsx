import { fetchAllGithubReleases } from "@/lib/data/fetch-github-releases"
import InfoIcon from "@mui/icons-material/Info"
import { Chip, IconButton, Typography } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Link from "next/link"

function createData(version: string, id: number) {
   return { version, id }
}

export async function GithubReleasesTable() {
   const releases = await fetchAllGithubReleases()
   const rows = releases.map((release) => createData(release.version, release.id))
   return (
      <>
         <Typography gutterBottom variant="h4">
            List of app releases
         </Typography>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell>Version</TableCell>
                     <TableCell align="right">Downloads</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {rows.map((row, index) => (
                     <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell component="th" scope="row">
                           {row.version} {index === 0 && <Chip sx={{ mx: 2 }} color="success" label="Latest" />}
                        </TableCell>
                        <TableCell align="right">
                           <Link href={`downloads/${row.id}`}>
                              <IconButton>
                                 <InfoIcon />
                              </IconButton>
                           </Link>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </>
   )
}
