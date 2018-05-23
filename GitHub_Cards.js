const Card = (props) => {
	return (
    <div style={{margin: '1em'}}>
      <img width="75" src={props.avatar_url} />
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

const CardList = (props) => {
	return (
    <div>
      {props.cards.map(card => <Card key={card.id} {...card} />)}
    </div>
  );
};

class Form extends React.Component {

state = { userName: '' }

handleSubmit = (event) => {
  event.preventDefault();

  var url = 'https://api.github.com/users/' + this.state.userName

  axios.get(url)
  	.then(resp => {
    	this.props.onSubmit(resp.data);
      this.setState({ userName: '' });
    });
};

render () {
	return (
    <form onSubmit={this.handleSubmit}>
      <input type="text"
        value={this.state.userName}
        onChange={(event) => this.setState({ userName: event.target.value })}
      	placeholder="GitHub username" />
      <button type="submit">Add Card</button>
    </form>
  )
}}

class App extends React.Component{

  state = {
    cards: [
      { name: "mat greten",
        avatar_url: "https://avatars0.githubusercontent.com/u/24303847?v=4",
        company: "Kapost"},
        { name: "Weird Al",
        avatar_url: "https://vignette.wikia.nocookie.net/scoobydoo/images/4/45/Weird_Al_Yankovic.png/revision/latest?cb=20120225074428",
        company: "WaffleKing"},
    ]
  };

  addNewCard = (cardInfo) => {
  	this.setState(prevState => ({
    	cards: prevState.cards.concat(cardInfo)
    }));
  };

 render() {
 	return (
  	<div>
  	  <Form onSubmit={this.addNewCard} />
      <CardList cards={this.state.cards} />
  	</div>
  )
 }
}

ReactDOM.render(<App />, mountNode);
