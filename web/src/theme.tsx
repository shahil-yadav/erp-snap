import { createTheme } from "@mui/material/styles"
import { deepPurple, red, teal } from "@mui/material/colors"

// A custom theme for this app
const theme = createTheme({
   palette: {
      primary: {
         main: deepPurple.A100,
      },
      secondary: {
         main: teal[600],
      },
      error: {
         main: red.A400,
      },
   },
})

export default theme
