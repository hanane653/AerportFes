import { useState } from 'react';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from '../../context/TranslationContext'; // Adjust the path if necessary

import flagEn from '../../assets/icons/ic_flag_en.svg';
import flagFr from '../../assets/icons/ic_flag_fr.svg';

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: flagEn,
  },
  {
    value: 'fr',
    label: 'French',
    icon: flagFr,
  },
];

export default function LanguageSelector() {
  const [open, setOpen] = useState(null);
  const { changeLanguage } = useTranslation();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLanguageChange = (value) => {
    changeLanguage(value);
    handleClose();
  };

  return (
    <div className="languageSelector">
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <img src={LANGS.find(lang => lang.value === 'en').icon} alt="Language Icon" />
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 180,
          },
        }}
      >
        {LANGS.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleLanguageChange(option.value)}
            sx={{ typography: 'body2', py: 1 }}
          >
            <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
            {option.label}
          </MenuItem>
        ))}
      </Popover>
      </div>
  );
}
