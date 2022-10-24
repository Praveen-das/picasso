const box_style = {
    boxSizing: 'border-box',
    position: "absolute",
    display: 'grid',
    alignItems: 'center',
    inset: 0,
    margin: { xs: '0.5rem 1rem 0 1rem ', md: '0.5rem auto' },
    marginRight: { md: '0.5rem' },
    padding: { xs: '0 2rem', sm: '0 4rem' },
    maxWidth: { xs: '100%', md: '60%', lg: '45%' },
    bgcolor: "background.paper",
    boxShadow: 5,
    borderRadius: { md: '20px' },
};

const TF_Style = {
    variant: 'standard',
    fullWidth: true,
}

export {
    box_style,
    TF_Style
}
