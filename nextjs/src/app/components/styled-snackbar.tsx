import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import * as React from "react"

export function useSnackbar() {
   const [open, setOpen] = React.useState(false)

   const handleClick = () => {
      setOpen(true)
   }

   const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason === "clickaway") {
         return
      }
      setOpen(false)
   }

   return { open, handleClick, handleClose }
}

export function SnackbarAlertSuccess({
   open,
   handleClose,
   label,
}: {
   open: boolean
   handleClose: (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => void
   label: string
}) {
   return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
         <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
            {label}
         </Alert>
      </Snackbar>
   )
}
