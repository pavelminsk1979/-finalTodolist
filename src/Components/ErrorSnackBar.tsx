import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import {useDispatch, useSelector} from "react-redux";
import {appActions} from "../state/appReducer";
import {selectError} from "../state/appSelectors";

const Alert = React.forwardRef<HTMLDivElement,
    AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert
        elevation={6}
        ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {

    const dispatch = useDispatch()
    const error = useSelector(selectError)


    const handleClose = (event?: React.SyntheticEvent
        | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(appActions.errorShow(
            {error:null}))
    }
    return (
        <Snackbar
            open={error!==null}
            autoHideDuration={6000}
            onClose={handleClose}>
            <Alert onClose={handleClose}
                   severity='warning' sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )}