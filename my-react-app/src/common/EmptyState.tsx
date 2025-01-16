import { Box, Typography } from '@mui/material';

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, icon }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      py: 8,
    }}
  >
    {icon}
    <Typography color="text.secondary" mt={2}>
      {message}
    </Typography>
  </Box>
);
