// == Import
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Dimmer, Loader } from 'semantic-ui-react';

import SearchBar from 'src/components/SearchBar';
import Message from 'src/components/Message';
import ReposResults from 'src/components/ReposResults';
import MoreResults from 'src/components/MoreResults';

/*
quand on utilise une image locale (stockée dans src), il faut l'importer pour que
Webpack puisse la traiter et la rendre disponible dans le dossier dist. Webpack lui
donnera un autre nom
*/
import logo from 'src/assets/images/logo-github.png';

import './styles.scss';

/*
Objectif : afficher un loader en attendant la réponse de l'API
x stocker un booléen dans le state (initialement false)
x un loader à afficher => semantic-ui-react ?
x affichage conditionnel du loader en fonction du state
x changer l'état à true quand on envoie la requete
- changer l'état à false dans le finally de la requête
*/

// == Composant
const App = () => {
  // valeur de l'input de recherche
  const [search, setSearch] = useState('');
  // repositories à afficher
  const [results, setResults] = useState([]);
  // nombre de résultats
  const [nbResults, setNbResults] = useState(0);
  // indique si le loader est affiché
  const [loading, setLoading] = useState(false);

  // prise en compte dans le state de la nouvelle valeur
  // const updateSearchValue = (newValue) => {
  //   // console.log('Mise à jour de la valeur');
  //   setSearch(newValue);
  // };

  // optimisation : une fonction qui a pour seul rôle de transmettre ses paramètres
  // tels quels à une autre fonction n'a pas vraiment d'utilité
  // => ici on peut utiliser directement dans les props du composant contrôlé
  // la variable et la fonction fournis par useState

  const loadResults = () => {
    // console.log(`validation de la recherche : ${search}`);

    // on veut faire apparaitre le loader
    setLoading(true);

    // on envoie une requête à l'API de recherche
    // (ajout de paramètres pour gérer la pagination des résultats)
    axios.get(`https://api.github.com/search/repositories?q=${search}&sort=stars&order=desc&page=1&per_page=9`)
      .then((response) => {
        // console.log('repositories :', response.data.items);
        // console.log(`nb : ${response.data.total_count}`);
        setResults(response.data.items);
        setNbResults(response.data.total_count);
      })
      .catch((error) => {
        console.log(error);

        // TODO afficher un message d'erreur pour l'utilisateur
      })
      .finally(() => {
        // on veut faire disparaitre le loader
        setLoading(false);
      });
  };

  const fetchMoreResults = () => {
    // affichage du loader pendant le chargement des résultats supplémentaires =>
    // ici pour améliorer l'ergonomie on pourrait avoir plutôt un loader sur le bouton,
    // mais plus difficile à gérer, il faudrait encore ajouter une nouvelle
    // information au state
    // Note : on a ajouté une prop "page" au composant Dimmer pour que le layer gris
    // recouvre bien toute la page
    setLoading(true);

    axios.get(`https://api.github.com/search/repositories?q=${search}&sort=stars&order=desc&page=${(results.length / 9) + 1}&per_page=9`)
      .then((response) => {
        setResults([
          ...results,
          // utilisation de spread operator pour "aplatir" le tableau (récupérer les
          // éléments), sinon on intègrerait un tableau dans le tableau
          ...response.data.items,
        ]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /* useEffect : appliquer un effet de bord à un moment précis de la vie du
  composant. Effet de bord : traitement "à côté" du traitement principal (agir sur
  autre chose), pour un composant React c'est tout ce qui est autre que le JSX =>
  par exemple faire appel à une API, ou changer le titre de l'onglet.
  useEffect est le hook qui remplace componentDidMount, componentDidUpdate, componentWillUnmout.
  Paramètres :
   - callback qui permet d'appliquer l'effet
   - tableau de dépendances (facultatif)
       - non fourni : effet exécuté après chaque rendu du composant => équivalent
       de cDM + cDU
       - tableau vide [] : effet exécuté seulement après le premier rendu du
       composant, jamais ré-exécuté ensuite => équivalent de cDM
       - tableau non vide : effet exécuté après le premier rendu, et pour les
       rendus suivants il est appliqué seulement si l'une des dépendances du tableau
       a changé de valeur
  */

  // on met à jour le titre après le premier rendu de App, et pour les rendus
  // suivants on met à jour le titre seulement si results a changé de valeur
  useEffect(() => {
    console.log('useEffect');
    document.title = `Github search - ${search}`;
  }, [results]);

  return (
    <div className="app">
      <header className="logo-github">
        <img src={logo} alt="" />
      </header>
      <SearchBar search={search} setSearch={setSearch} handleSubmit={loadResults} />
      <Message nbResults={nbResults} />
      <ReposResults results={results} />

      {results.length !== nbResults && (
        <MoreResults
          fetchMore={fetchMoreResults}
        />
      )}

      {loading && (
        <Dimmer active page>
          <Loader />
        </Dimmer>
      )}

    </div>
  );
};

// == Export
export default App;
