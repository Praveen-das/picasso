import { Avatar as _Avatar } from '@mui/material/'

function Avatar({ displayName, sx, profilePicture }) {
    function stringToColor(string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substring(-2);
        }
        return color;
    }

    function handleProfilePicture() {
        if (profilePicture) return { src: profilePicture }
        if (!displayName) return
        const name = displayName.toUpperCase()
        const haveLastName = name.trim().indexOf(' ') !== -1

        return {
            sx: {
                bgcolor: stringToColor(name),
                width: sx && sx.width,
                height: sx && sx.height
            },
            children: haveLastName ?
                `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` :
                `${name.split(' ')[0][0]}`
        };
    }
    return (
        <>
            <_Avatar sx={{ width: sx && sx.width, height: sx && sx.height, }} {...handleProfilePicture()} />
        </>
    )
}

export default Avatar
