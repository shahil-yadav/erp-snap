"use client"

import formbricks from "@formbricks/js";
import { BugReport } from "@mui/icons-material";
import { Button, CircularProgress, MenuItem } from "@mui/material";
import React from "react";

const useAsyncStatus = () => {
    const [isSuccessfull, setIsSuccessfull] = React.useState(false)
    const [isPending, setIsPending] = React.useState(false)
    const [isError, setIsError] = React.useState(false)

    const triggerSurveryForm = async() => {
        try {
            setIsPending(true)
            await formbricks.track('report-btn-clicked')
            setIsSuccessfull(true)
        } catch (error) {
            setIsError(true)
        } finally {
            setIsPending(false)
        }

    }

    return {isSuccessfull, isPending, isError, triggerSurveryForm}
}

export const FormbricksReportElement = (props : { isButton?: boolean }) => {
    const {isError, isPending, triggerSurveryForm} = useAsyncStatus() 

    let El:React.ReactNode = <BugReport />
    if(isPending) El = <CircularProgress size={20} />
    if(isError) El = "Try again, report"

    if(props.isButton)
        return <Button onClick={triggerSurveryForm}>{El}</Button>

    return <MenuItem onClick={triggerSurveryForm}>Request for a feature/ Report a bug {El}</MenuItem>
}