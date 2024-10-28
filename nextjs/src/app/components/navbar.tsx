"use client"

import { Sitemark } from "@/icons/sitemark"
import { FormbricksReportElement } from "@/lib/formbricks/report-btn";
import formbricks from "@formbricks/js";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import MenuIcon from "@mui/icons-material/Menu"
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded"
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded"
import { alpha, AppBar, Container, PaletteMode, styled, Toolbar, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import MenuItem from "@mui/material/MenuItem"
import Link from "next/link"
import React from "react"


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
   display: "flex",
   alignItems: "center",
   justifyContent: "space-between",
   flexShrink: 0,
   borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
   backdropFilter: "blur(24px)",
   border: "1px solid",
   borderColor: theme.palette.divider,
   backgroundColor: alpha(theme.palette.background.default, 0.4),
   boxShadow: theme.shadows[1],
   padding: "8px 12px",
}))

const links = [
   { label: "Home", to: "/" },
   { label: "Downloads", to: "/downloads" },
]

interface ToggleColorModeProps extends IconButtonProps {
   mode: PaletteMode
   toggleColorMode: () => void
}

const handleFormbrickReportEvent = () => formbricks.track('report-btn-clicked')

export const Navbar = (props: ToggleColorModeProps) => {
   const [open, setOpen] = React.useState(false)

   const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen)
   }

   return (
      <AppBar position="fixed" sx={{ boxShadow: 0, bgcolor: "transparent", backgroundImage: "none", mt: 5 }}>
         <Container maxWidth="lg">
            <StyledToolbar variant="dense" disableGutters>
               <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}>
                  <Link href="/">
                     <Button color="primary" variant="text" size="small">
                        <Typography sx={{ mr: 1 }} variant="button">
                           Developed by
                        </Typography>
                        <Sitemark />
                     </Button>
                  </Link>
                  <Box sx={{ display: { xs: "none", md: "flex" } }}></Box>
               </Box>
               <Box
                  sx={{
                     display: { xs: "none", md: "flex" },
                     gap: 1,
                     alignItems: "center",
                  }}
               >
                  {links.map((link) => (
                     <Button key={link.label} variant="text" color="info" size="small">
                        <Link href={link.to}>{link.label}</Link>
                     </Button>
                  ))}
                  
                  <FormbricksReportElement isButton />
                  

                  <IconButton
                     onClick={props.toggleColorMode}
                     color="primary"
                     size="small"
                     aria-label="Theme toggle button"
                  >
                     {props.mode === "dark" ? (
                        <WbSunnyRoundedIcon fontSize="small" />
                     ) : (
                        <ModeNightRoundedIcon fontSize="small" />
                     )}
                  </IconButton>
               </Box>
               <Box sx={{ display: { sm: "flex", md: "none" } }}>
                  <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                     <MenuIcon />
                  </IconButton>
                  <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                     <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                        <Box
                           sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                           }}
                        >
                           <IconButton onClick={toggleDrawer(false)}>
                              <CloseRoundedIcon />
                           </IconButton>
                        </Box>
                        <Divider sx={{ my: 3 }} />
                        {links.map((link) => (
                           <Link key={link.to} href={link.to}>
                              <MenuItem onClick={() => setOpen(false)} key={link.label}>
                                 {link.label}
                              </MenuItem>
                           </Link>
                        ))}

                        <div role="button" onClick={() => setOpen(false)}>
                           <FormbricksReportElement />
                        </div>

                        <Button
                           fullWidth
                           onClick={props.toggleColorMode}
                           color="primary"
                           size="small"
                           aria-label="Theme toggle button"
                           startIcon={
                              props.mode === "dark" ? (
                                 <WbSunnyRoundedIcon fontSize="small" />
                              ) : (
                                 <ModeNightRoundedIcon fontSize="small" />
                              )
                           }
                        >
                           {props.mode === "light" ? "Change to dark theme" : "Change to light theme"}
                        </Button>
                        {/* <MenuItem>
                           <Button color="primary" variant="contained" fullWidth>
                              Sign up
                           </Button>
                        </MenuItem>
                        <MenuItem>
                           <Button color="primary" variant="outlined" fullWidth>
                              Sign in
                           </Button>
                        </MenuItem> */}
                     </Box>
                  </Drawer>
               </Box>
            </StyledToolbar>
         </Container>
      </AppBar>
   )
}
