"use client"

import { getTheme } from "@/theme/getTheme"
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded"
import SettingsIcon from "@mui/icons-material/Settings"
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { createTheme, PaletteMode, styled, ThemeProvider } from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar"
import * as React from "react"

const StyledAppBar = styled(AppBar)(({ theme }) => ({
   position: "relative",
   display: "flex",
   alignItems: "center",
   justifyContent: "space-between",
   flexShrink: 0,
   borderBottom: "1px solid",
   borderColor: theme.palette.divider,
   backgroundColor: theme.palette.background.paper,
   boxShadow: "none",
   backgroundImage: "none",
   zIndex: theme.zIndex.drawer + 1,
   flex: "0 0 auto",
}))

interface FrameProps {
   showCustomTheme: boolean
   toggleCustomTheme: (theme: boolean) => void
   mode: PaletteMode
   toggleColorMode: () => void
   children: React.ReactNode
}

const isEnvironmentInProduction = () => process.env.NODE_ENV === "production"

export function Frame({ showCustomTheme, toggleCustomTheme, mode, toggleColorMode, children }: FrameProps) {
   const theme = createTheme(getTheme(mode))
   const handleChange = (event: SelectChangeEvent) => {
      toggleCustomTheme(event.target.value === "custom")
   }

   return (
      <ThemeProvider theme={theme}>
         <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
            {!isEnvironmentInProduction() && (
               <StyledAppBar>
                  <Toolbar
                     variant="dense"
                     disableGutters
                     sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        p: "8px 12px",
                     }}
                  >
                     <Button
                        variant="text"
                        size="small"
                        aria-label="Back to templates"
                        startIcon={<SettingsIcon />}
                        component="a"
                        href="/"
                        sx={{ display: { xs: "none", sm: "flex" } }}
                     >
                        Testing the themes
                     </Button>
                     <IconButton
                        size="small"
                        aria-label="Back to templates"
                        component="a"
                        href="/"
                        sx={{ display: { xs: "auto", sm: "none" } }}
                     >
                        <SettingsIcon />
                     </IconButton>
                     <Box sx={{ display: "flex", gap: 1 }}>
                        <FormControl variant="outlined" sx={{ minWidth: 180 }}>
                           <Select
                              size="small"
                              labelId="theme-select-label"
                              id="theme-select"
                              value={showCustomTheme ? "custom" : "material"}
                              onChange={handleChange}
                              label="Design Language"
                           >
                              <MenuItem value="custom">Custom Theme</MenuItem>
                              <MenuItem value="material">Material Design v6</MenuItem>
                           </Select>
                        </FormControl>
                        <ToggleColorMode data-screenshot="toggle-mode" mode={mode} toggleColorMode={toggleColorMode} />
                     </Box>
                  </Toolbar>
               </StyledAppBar>
            )}
            <Box sx={{ flex: "1 1", overflow: "auto" }}>{children}</Box>
         </Box>
      </ThemeProvider>
   )
}

interface ToggleColorModeProps extends IconButtonProps {
   mode: PaletteMode
   toggleColorMode: () => void
}

export default function ToggleColorMode({ mode, toggleColorMode, ...props }: ToggleColorModeProps) {
   return (
      <IconButton onClick={toggleColorMode} color="primary" size="small" aria-label="Theme toggle button" {...props}>
         {mode === "dark" ? <WbSunnyRoundedIcon fontSize="small" /> : <ModeNightRoundedIcon fontSize="small" />}
      </IconButton>
   )
}
