import { Button, InputBase, useMediaQuery, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchComp(props) {
  const { searchTerm, handleSearch } = props;
  
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {isMatch ? (
        <Button color='inherit' variant='outlined' size='medium'>
          <SearchIcon />
        </Button>
      ) : (
        <Button
          color='inherit'
          variant='outlined'
          size='medium'
          endIcon={<SearchIcon />}
        >
          <InputBase
            color='inherit'
            placeholder='Search Resolve'
            defaultValue={searchTerm}
            type='string'
            value={searchTerm}
            onChange={handleSearch}
            inputProps={{
              sx: { '&::placeholder': { color: 'white' }, color: 'white' },
            }}
          />
        </Button>
      )}
    </>
  );
}

export default SearchComp;
