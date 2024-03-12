import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";

import PropTypes from 'prop-types';

export default function NewSaleInputs({
  saleData,
  onInputChange,
  errors,
  handleSubmit,
}) {
NewSaleInputs.propTypes = {
  saleData: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
  return (
    <>
      <TextField
      size="small"
      autoComplete="off"
        id="title"
        label="title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={saleData.title}
        onChange={onInputChange}
        error={Boolean(errors.title)}
        helperText={errors.title}
      />
      <TextField
      size="small"
      autoComplete="off"
        id="description"
        label="description"
        variant="outlined"
        fullWidth
        margin="normal"
        value={saleData.description}
        onChange={onInputChange}
        error={Boolean(errors.description)}
        helperText={errors.description}
      />
      <TextField
      size="small"
      autoComplete="off"
        id="subtitle"
        label="subtitle"
        variant="outlined"
        fullWidth
        margin="normal"
        value={saleData.subtitle}
        onChange={onInputChange}
        error={Boolean(errors.subtitle)}
        helperText={errors.subtitle}
      />
      <TextField
      size="small"
      autoComplete="off"
        id="phone"
        label="phone"
        variant="outlined"
        fullWidth
        margin="normal"
        value={saleData.phone}
        onChange={onInputChange}
        error={Boolean(errors.phone)}
        helperText={errors.phone}
      />
      <TextField
      size="small"
      autoComplete="off"
        id="email"
        label="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={saleData.email}
        onChange={onInputChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />
      <TextField
      size="small"
      autoComplete="off"
        id="web"
        label="web"
        variant="outlined"
        fullWidth
        margin="normal"
        value={saleData.web}
        onChange={onInputChange}
        error={Boolean(errors.web)}
        helperText={errors.web}
      />
      <TextField
      size="small"
      autoComplete="off"
        id="imgUrl"
        label="imgUrl"
        variant="outlined"
        fullWidth
        margin="normal"
        value={saleData.imgUrl}
        onChange={onInputChange}
        error={Boolean(errors.imgUrl)}
        helperText={errors.imgUrl}
      />
      <TextField
      size="small"
      autoComplete="off"
        id="imgAlt"
        label="imgAlt"
        variant="outlined"
        fullWidth
        margin="normal"
        value={saleData.imgAlt}
        onChange={onInputChange}
        error={Boolean(errors.imgAlt)}
        helperText={errors.imgAlt}
      />
      <TextField
      size="small"
      autoComplete="off"
        id="state"
        label="state"
        variant="outlined"
        fullWidth
        margin="normal"
        value={saleData.state}
        onChange={onInputChange}
        error={Boolean(errors.state)}
        helperText={errors.state}
      />
      <TextField
      size="small"
      autoComplete="off"
        id="country"
        label="country"
        variant="outlined"
        fullWidth
        margin="normal"
        value={saleData.country}
        onChange={onInputChange}
        error={Boolean(errors.country)}
        helperText={errors.country}
      />
      <TextField
      size="small"
      autoComplete="off"
        id="city"
        label="city"
        variant="outlined"
        fullWidth
        margin="normal"
        value={saleData.city}
        onChange={onInputChange}
        error={Boolean(errors.city)}
        helperText={errors.city}
      />
      <TextField
      size="small"
      autoComplete="off"
        id="street"
        label="street"
        variant="outlined"
        fullWidth
        margin="normal"
        value={saleData.street}
        onChange={onInputChange}
        error={Boolean(errors.street)}
        helperText={errors.street}
      />

      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <IconButton
          id="btnCreateAndPress"
          
          style={{ width: "auto" }}
          onClick={handleSubmit}>
          <SendIcon />
        </IconButton>
      </Typography>
    </>
  );
}
