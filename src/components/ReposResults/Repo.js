import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';

const Repo = ({ name, description, owner }) => (
  <Card>
    <Image src={owner.avatar_url} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>
        {owner.login}
      </Card.Meta>
      <Card.Description>
        {description}
      </Card.Description>
    </Card.Content>
  </Card>
);

Repo.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  owner: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
  }).isRequired,
};

// si une prop n'est pas obligatoire, on indique la valeur par défaut => cette valeur
// sera utilisée si la prop est vide
Repo.defaultProps = {
  // nom de la prop: valeur par défaut
  description: '',
};

export default Repo;
