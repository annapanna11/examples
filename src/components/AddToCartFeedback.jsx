import { useContext } from 'react';
import { CartContext } from '../CartContext';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const AddToCartFeedback = ({ isOpen }) => {
  const { setShowFeedback } = useContext(CartContext);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowFeedback(false);
  };

  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      message="Varan lades i varukorgen"
      action={action}
    />
  );
};

export default AddToCartFeedback;
