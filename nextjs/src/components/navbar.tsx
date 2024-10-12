import AppBar from "@mui/base/"

export const Navbar = () => {
   return (
      <AppBar position="fixed" sx={{ boxShadow: 0, bgcolor: "transparent", backgroundImage: "none", mt: 10 }}>
         <Container maxWidth="lg">
            <StyledToolbar variant="dense" disableGutters>
               <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}>
                  <Sitemark />
                  <Box sx={{ display: { xs: "none", md: "flex" } }}>
                     <Button variant="text" color="info" size="small">
                        Features
                     </Button>
                     <Button variant="text" color="info" size="small">
                        Testimonials
                     </Button>
                     <Button variant="text" color="info" size="small">
                        Highlights
                     </Button>
                     <Button variant="text" color="info" size="small">
                        Pricing
                     </Button>
                     <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                        FAQ
                     </Button>
                     <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                        Blog
                     </Button>
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
                        <MenuItem>Features</MenuItem>
                        <MenuItem>Testimonials</MenuItem>
                        <MenuItem>Highlights</MenuItem>
                        <MenuItem>Pricing</MenuItem>
                        <MenuItem>FAQ</MenuItem>
                        <MenuItem>Blog</MenuItem>
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
