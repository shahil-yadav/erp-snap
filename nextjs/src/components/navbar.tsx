"use client"

import { Sitemark } from "@/icons/sitemark"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import MenuIcon from "@mui/icons-material/Menu"
import { alpha, AppBar, Container, styled, Toolbar, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
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
   { label: "Resources", to: "/" },
   { label: "Downloads", to: "/downloads" },
]

export const Navbar = () => {
   const [open, setOpen] = React.useState(false)

   const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen)
   }

   return (
      <AppBar position="fixed" sx={{ boxShadow: 0, bgcolor: "transparent", backgroundImage: "none", mt: 5 }}>
         <Container maxWidth="lg">
            <StyledToolbar variant="dense" disableGutters>
               <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}>
                  <Button color="primary" variant="text" size="small">
                     <Typography sx={{ mr: 1 }} variant="button">
                        Open sourced by
                     </Typography>
                     <Sitemark />
                  </Button>
                  <Box sx={{ display: { xs: "none", md: "flex" } }}>
                     {links.map((link) => (
                        <Button key={link.label} variant="text" color="info" size="small">
                           <Link href={link.to}>{link.label}</Link>
                        </Button>
                     ))}
                  </Box>
               </Box>
               <Box
                  sx={{
                     display: { xs: "none", md: "flex" },
                     gap: 1,
                     alignItems: "center",
                  }}
               >
                  <Button color="primary" variant="text" size="small">
                     Sign in
                  </Button>
                  <Button color="primary" variant="contained" size="small">
                     Sign up
                  </Button>
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
                           <MenuItem key={link.label}>
                              <Link href={link.to}>{link.label}</Link>
                           </MenuItem>
                        ))}
                        <MenuItem>
                           <Button color="primary" variant="contained" fullWidth>
                              Sign up
                           </Button>
                        </MenuItem>
                        <MenuItem>
                           <Button color="primary" variant="outlined" fullWidth>
                              Sign in
                           </Button>
                        </MenuItem>
                     </Box>
                  </Drawer>
               </Box>
            </StyledToolbar>
         </Container>
      </AppBar>
   )
}
