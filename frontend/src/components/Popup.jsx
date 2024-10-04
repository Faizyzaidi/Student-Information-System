import * as React from 'react';
import { useDispatch } from 'react-redux';
import { underControl } from '../redux/userRelated/UserSlice';
import { underStudentControl } from '../redux/studentRelated/StudentSlice';
//import MuiAlert from '@mui/material/Alert';
// { Snackbar } from '@mui/material';
//import PropTypes from 'prop-types';

const Popup = ({ message, setShowPopup, showPopup, severity = "error", duration = 2000 }) => {
    const dispatch = useDispatch();

    const vertical = "top";
    const horizontal = "right";

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowPopup(false);
        dispatch(underControl());
        dispatch(underStudentControl());
    };

    return (
        <Snackbar
            open={showPopup}
            autoHideDuration={duration}
            onClose={handleClose}
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical}-${horizontal}`}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// PropTypes for type checking
Popup.propTypes = {
    message: PropTypes.string.isRequired,
    setShowPopup: PropTypes.func.isRequired,
    showPopup: PropTypes.bool.isRequired,
    severity: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
    duration: PropTypes.number,
};

export default Popup;
