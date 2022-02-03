import PropTypes from 'prop-types';

// on importe le composant qui s'appelle Message, mais on l'utilise avec le nom
// MessageSemantic
import { Message as MessageSemantic } from 'semantic-ui-react';

const Message = ({ nbResults }) => (
  <MessageSemantic>
    {nbResults} résultat(s)
  </MessageSemantic>
);

Message.propTypes = {
  nbResults: PropTypes.number.isRequired,
};

export default Message;
