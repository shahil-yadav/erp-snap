"use client"

import { AdminPanelSettings, ElectricBolt } from "@mui/icons-material"
import HistoryEduIcon from "@mui/icons-material/HistoryEdu"
import PhpIcon from "@mui/icons-material/Php"
import { Card, CardContent, styled, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid2"

const StyledCard = styled(Card)(({ theme }) => ({
   display: "flex",
   flexDirection: "column",
   padding: 0,
   height: "100%",
   backgroundColor: theme.palette.background.paper,
   "&:hover": {
      backgroundColor: "transparent",
      cursor: "pointer",
   },
   "&:focus-visible": {
      outline: "3px solid",
      outlineColor: "hsla(210, 98%, 48%, 0.5)",
      outlineOffset: "2px",
   },
}))

const SyledCardContent = styled(CardContent)({
   display: "flex",
   flexDirection: "column",
   gap: 4,
   padding: 16,
   flexGrow: 1,
   "&:last-child": {
      paddingBottom: 16,
   },
})

const StyledTypography = styled(Typography)({
   display: "-webkit-box",
   WebkitBoxOrient: "vertical",
   WebkitLineClamp: 2,
   overflow: "hidden",
   textOverflow: "ellipsis",
})

export const Services = () => (
   <Box sx={{ py: 5, px: 2 }}>
      <Grid container spacing={2} columns={12}>
         <Grid size={{ xs: 12, md: 4 }}>
            <StyledCard
               variant="outlined"
               // onFocus={() => handleFocus(0)}
               // onBlur={handleBlur}
               tabIndex={0}
               // className={focusedCardIndex === 0 ? "Mui-focused" : ""}
            >
               <SyledCardContent>
                  <Typography gutterBottom variant="caption" component="div">
                     <AdminPanelSettings />
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                     Security and Privacy
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                     Your login information is shared with the college's <span className="hidden">PHP</span>
                     <PhpIcon className="mx-2" /> server, while a local copy is also kept on your device. No proxy
                     server is used.
                  </Typography>
               </SyledCardContent>
            </StyledCard>
         </Grid>
         <Grid size={{ xs: 12, md: 4 }}>
            <StyledCard
               variant="outlined"
               // onFocus={() => handleFocus(0)}
               // onBlur={handleBlur}
               tabIndex={0}
               // className={focusedCardIndex === 0 ? "Mui-focused" : ""}
            >
               <SyledCardContent>
                  <Typography gutterBottom variant="caption" component="div">
                     <ElectricBolt />
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                     Offline Support + Background fetching
                  </Typography>
                  <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                     Powered by custom cache manage enabling offline support in time the internet in the campus is shaky
                  </StyledTypography>
               </SyledCardContent>
            </StyledCard>
         </Grid>
         <Grid size={{ xs: 12, md: 4 }}>
            <StyledCard
               variant="outlined"
               // onFocus={() => handleFocus(0)}
               // onBlur={handleBlur}
               tabIndex={0}
               // className={focusedCardIndex === 0 ? "Mui-focused" : ""}
            >
               <SyledCardContent>
                  <Typography gutterBottom variant="caption" component="div">
                     <HistoryEduIcon />
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                     Lightweight in size
                  </Typography>
                  <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                     Trusted by more than 300 students currently
                  </StyledTypography>
               </SyledCardContent>
            </StyledCard>
         </Grid>
      </Grid>
   </Box>
)
