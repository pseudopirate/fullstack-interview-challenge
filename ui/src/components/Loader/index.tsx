import React from 'react';
import { CircularProgress } from "@mui/material";

function Loader({timeout = 500}) {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setVisible(true);
        }, timeout);
    }, []);

    return visible ? <CircularProgress/> : null;
}

export default Loader;