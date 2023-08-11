import { IconButton } from '@mui/material';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useStore } from '../Context/Store';


export function CopyToClipboard({ name, value, fontSize = 16 }) {
    const setAlert = useStore((s) => s.setAlert);

    const copyToClipboard = async (type, value) => {
        setAlert({ toggled: false });
        await navigator.clipboard.writeText(value);
        setAlert({
            toggled: true,
            message: `${type} copied to clipboard`,
            type: "info",
            time: 1000,
        });
    };

    return (
        <IconButton
            onClick={() => copyToClipboard(name, value)}
        >
            <ContentCopyIcon sx={{ fontSize }} />
        </IconButton>
    );
}
