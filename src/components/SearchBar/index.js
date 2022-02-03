import PropTypes from 'prop-types';
import { Input, Form, Segment } from 'semantic-ui-react';

const SearchBar = ({ search, setSearch, handleSubmit }) => (
  <Segment>
    <Form onSubmit={(event) => {
      event.preventDefault();

      // informer App que le formulaire a été soumis
      handleSubmit();
    }}
    >
      <Form.Field>
        <Input
          icon="search"
          placeholder="Rechercher..."
          iconPosition="left"
          value={search}
          onChange={(event) => {
            const newValue = event.target.value;
            // console.log(`changement de valeur de l'input : ${newValue}`);
            setSearch(newValue);
          }}
        />
      </Form.Field>
    </Form>
  </Segment>
);

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  // paramètre : nouvelle valeur
  setSearch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
