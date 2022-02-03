import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import Repo from './Repo';

const ReposResults = ({ results }) => (
  <Card.Group itemsPerRow={3}>
    {results.map((item) => (
      <Repo
        key={item.id}
        {...item}
      />
    ))}
  </Card.Group>
);

ReposResults.propTypes = {
  // tableau qui contient des objets
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ReposResults;
