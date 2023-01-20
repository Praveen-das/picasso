import { Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './breadcrumbs.css'

export default function BreadCrumb({ paths = [] }) {
    return (
        <div className='breadcrumbs'>
            <Breadcrumbs separator={<NavigateNextIcon sx={{ fontSize: 15 }} />} aria-label="breadcrumb">
                <Link fontSize={12} underline="none" color="var(--brand)" textTransform='capitalize' href="/">
                    home
                </Link>
                {
                    !!paths.length &&
                    paths.map((path, i) => (
                        i === paths.length - 1 ?
                            <Typography key={i} textTransform='capitalize' fontWeight={700} fontSize={12} color="var(--brandMain)">{path}</Typography>
                            :
                            <Link key={i} textTransform='capitalize' fontSize={12} underline="none" color="var(--brand)" href={`/${path}`}>
                                {path}
                            </Link>
                    ))
                }
            </Breadcrumbs>
        </div>
    )
}